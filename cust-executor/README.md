# CUST Executor

Local execution gate for QOTE / Resona.

- Listens on `POST /cust/execute`
- Accepts signed JSON "cust commands"
- Verifies:
  - HMAC-SHA256 signature
  - Target repo allowlist
  - Operation allowlist (`git commit_and_push`, `vercel deploy`)
- Executes using *your* local environment and credentials.

This keeps write access and secrets fully under your control while allowing
LLM-based planners (Resona, ChatGPT, etc.) to propose structured actions.
