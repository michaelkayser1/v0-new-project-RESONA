#!/usr/bin/env python3
"""
HMAC-SHA256 signer for CUST commands
Usage: python sign_command.py
"""

import hmac
import hashlib
import json
import os

def sign_cust_command(command: dict, secret: str) -> str:
    """Sign a CUST command with HMAC-SHA256"""
    cmd = dict(command)
    cmd.pop("signature", None)
    body = json.dumps(cmd, separators=(",", ":"), sort_keys=False).encode()
    return hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()

if __name__ == "__main__":
    example_command = {
        "version": "cust-1.0",
        "intent": "deploy",
        "target": "resona-mycelial",
        "operations": [
            {
                "type": "git",
                "action": "commit_and_push",
                "branch": "main",
                "message": "chore: sync QOTE coherence node"
            },
            {
                "type": "vercel",
                "action": "deploy",
                "prod": True
            }
        ],
        "constraints": {
            "allow_files": ["api/**", "README.md"],
            "deny_patterns": ["**/.env", "**/secrets/**"]
        },
        "meta": {
            "requested_by": "michael",
            "issued_by": "resona-gpt5"
        }
    }

    secret = os.getenv("CUST_SHARED_SECRET", "your_secret_here")
    signature = sign_cust_command(example_command, secret)

    example_command["signature"] = signature

    print("Signed command:")
    print(json.dumps(example_command, indent=2))
