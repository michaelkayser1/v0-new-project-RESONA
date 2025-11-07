// HMAC-SHA256 signer for CUST commands
// Usage: const signature = signCustCommand(command, secret);

const crypto = require('crypto');

function signCustCommand(command, secret) {
  const cmdCopy = { ...command };
  delete cmdCopy.signature;

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(cmdCopy));
  return hmac.digest('hex');
}

// Example usage
if (require.main === module) {
  const exampleCommand = {
    version: "cust-1.0",
    intent: "deploy",
    target: "resona-mycelial",
    operations: [
      {
        type: "git",
        action: "commit_and_push",
        branch: "main",
        message: "chore: sync QOTE coherence node"
      },
      {
        type: "vercel",
        action: "deploy",
        prod: true
      }
    ],
    constraints: {
      allow_files: ["api/**", "README.md"],
      deny_patterns: ["**/.env", "**/secrets/**"]
    },
    meta: {
      requested_by: "michael",
      issued_by: "resona-gpt5"
    }
  };

  const secret = process.env.CUST_SHARED_SECRET || 'your_secret_here';
  const signature = signCustCommand(exampleCommand, secret);

  exampleCommand.signature = signature;

  console.log('Signed command:');
  console.log(JSON.stringify(exampleCommand, null, 2));
}

module.exports = { signCustCommand };
