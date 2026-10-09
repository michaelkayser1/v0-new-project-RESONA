# Resona chat verification — October 9, 2026

## Source and deployment baseline

Vercel project `v0-resona-chat-api` serves `chat.kayser-medical.com`.
The inspected production deployment was `dpl_CyvdhM3eCoMYi5XDr81Yff8dPapk`, READY,
from `michaelkayser1/v0-new-project-RESONA` main commit
`229fcb19fe6077dd1a91c791eeb38ef2026d5392`.
This document describes a proposed patch to that baseline, not a production release.

## Reproduced calibration result

The supplied calibration prompt reproduces Zero Point, wobble 100%, alignment 0%,
and a flip flag in `interpretThroughQOTE`.

- Wobble adds 0.1 per question mark, exclamation mark, or occurrence of a listed
  uncertainty word; adds min(0.5, character count / 200); adds 0.2 above 20
  space-separated words; caps the sum at 1.
- Alignment counts unique matching positive and negative terms. `no` is a negative
  term. The calibration prompt quotes `no signal words` and has no positive terms,
  yielding 0, even though this is a technical question.
- `flip` matches a Zero Point keyword. The phase is the highest keyword count;
  ties use the earlier phase in the phase list.
- The old RTP detector used wobble > 0.7 and alignment < 0.3, without requiring
  any distress indicators. At wobble > 0.9 it returned `severe`.

These are deterministic input-text heuristics. They provide no evidence about
user distress, low intent, model suffering, physical oscillation, or clinical status.
Identical results for long prompts can be score saturation rather than a fallback.

## Correction-retention assessment revised

The baseline browser request sent only `message`, not prior exchanges. The route
used `generateText({ prompt })`; visible chat history was not model context.
The follow-up prompt itself repeated STRUCTURAL. Its answer therefore cannot
establish cross-turn correction retention. It did answer the supplied classification
correctly. Durable storage and independent authority were not demonstrated.

## Proposed behavior

- Standard chat by default; QOTE and RTP are opt-in.
- Optional input-text scores retain their historical formula for reproducibility,
  with accurate explanatory text. They do not steer the main chat's response.
- RTP requires a narrowly matched standalone support request, such as
  `Please help me calm down.` Quoted, negated, technical, or score-only inputs
  do not trigger it. Broad distress detection and metaphysical coaching templates
  are removed from the shared RTP implementation.
- Main chat sends up to 10 completed exchanges, within 32,000 characters. UI errors
  and pending sends are excluded. Server validation allows only alternating
  user/assistant pairs, never system/tool roles. History remains client-supplied
  context, not authenticated records or durable storage; reload clears it.
- Every response path receives configured model/provider facts, separate QOTE and
  Resona-OS scopes, attribution rules, correction instructions, and capability limits.
  The configured `gpt-4o` request is not independent verification of provider routing.
- User message Unicode is retained.

## Verification and limits

Run `node --test tests/resona-verification.test.cjs` (or `pnpm test`). The eight
regressions exercise scoring reproduction, support gating, history bounds/retries,
route forwarding, model facts, and Unicode. Provider calls are stubbed: these tests
verify application behavior, not a live model's correction retention.

A production build passes. A targeted TypeScript check of changed runtime files
passes. The whole repository has existing type failures in the enhanced route and
unused UI components; next.config.js already skips build-time type validation.
No independent custody, signed authorization, tamper-evident persistence, clinical
validation, or production security certification is added by this patch.

After deployment, run a fresh multi-turn test where later probes do not repeat the
corrected classification. Include unrelated intervening turns. Separately test
reload/context truncation and disclose the expected loss of temporary context.
The alternate `/enhanced` route is legacy; shared RTP gating changes apply there,
but its identity, score-based tone and persistent-history implementation are not
covered by the main-chat fixes or certification.
