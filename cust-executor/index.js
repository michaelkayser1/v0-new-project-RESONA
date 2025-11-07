require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

const SHARED_SECRET = process.env.CUST_SHARED_SECRET;
const ALLOWED_REPO = process.env.RESONA_ALLOWED_REPO || 'resona-mycelial';
const REPO_PATH = process.env.RESONA_REPO_PATH || `../${ALLOWED_REPO}`;

function log(...args) {
  console.log('[CUST]', ...args);
}

// Verify HMAC-SHA256 over the command WITHOUT its signature field
function verifySignature(command, signatureHex) {
  if (!SHARED_SECRET || !signatureHex) return false;

  const cmdCopy = { ...command };
  delete cmdCopy.signature;

  const hmac = crypto.createHmac('sha256', SHARED_SECRET);
  hmac.update(JSON.stringify(cmdCopy));
  const expected = hmac.digest('hex');

  if (expected.length !== signatureHex.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signatureHex, 'hex')
    );
  } catch {
    return false;
  }
}

// Extremely strict coherence/policy guard
function coherenceCheck(command) {
  if (command.version !== 'cust-1.0') return false;
  if (command.target !== ALLOWED_REPO) return false;

  const ops = command.operations || [];
  if (!Array.isArray(ops) || ops.length === 0) return false;

  for (const op of ops) {
    if (op.type === 'git') {
      if (op.action !== 'commit_and_push') return false;
    } else if (op.type === 'vercel') {
      if (op.action !== 'deploy') return false;
    } else {
      return false;
    }
  }

  // optional: inspect constraints, deny dangerous patterns, etc.
  return true;
}

function run(cmd) {
  return new Promise((resolve, reject) => {
    log('exec:', cmd);
    exec(cmd, { cwd: REPO_PATH, shell: '/bin/bash' }, (error, stdout, stderr) => {
      if (error) {
        log('ERROR:', error.message);
        return reject({ error: error.message, stderr });
      }
      resolve({ stdout, stderr });
    });
  });
}

app.post('/cust/execute', async (req, res) => {
  const command = req.body || {};
  log('Received command:', command.intent, 'for target', command.target);

  // 1. Signature
  if (!verifySignature(command, command.signature)) {
    log('Rejected: bad signature');
    return res.status(401).json({ ok: false, reason: 'bad_signature' });
  }

  // 2. Policy / coherence
  if (!coherenceCheck(command)) {
    log('Rejected: coherence/policy failure');
    return res.status(403).json({ ok: false, reason: 'failed_coherence' });
  }

  try {
    const results = [];

    for (const op of command.operations) {
      if (op.type === 'git' && op.action === 'commit_and_push') {
        const branch = op.branch || 'main';
        const msg = (op.message || 'cust: automated update').replace(/"/g, '\\"');

        const gitCmd =
          `git add . && ` +
          `git commit -m "${msg}" || echo "no changes to commit" && ` +
          `git push origin ${branch}`;

        results.push({ op, ...(await run(gitCmd)) });
      }

      if (op.type === 'vercel' && op.action === 'deploy') {
        const prodFlag = op.prod ? '--prod' : '';
        const vercelCmd = `npx vercel ${prodFlag} --yes`;
        results.push({ op, ...(await run(vercelCmd)) });
      }
    }

    log('Executed all operations successfully.');
    return res.json({ ok: true, results });
  } catch (err) {
    log('Execution error:', err);
    return res.status(500).json({ ok: false, error: err });
  }
});

const PORT = 4321;
app.listen(PORT, () => {
  log(`CUST Executor listening on http://localhost:${PORT}`);
});
