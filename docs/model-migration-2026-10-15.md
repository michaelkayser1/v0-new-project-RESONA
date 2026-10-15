# Resona chat model migration — October 15, 2026 UTC

## Scope

Replace the active chat route's GPT-4o dependency before the January 14, 2027
retirement in the owner's October 14 OpenAI email. The `/api/chat` and
`/api/resona-enhanced` POST aliases share this route. Resona-OS governance,
experimental scoring formulas, authorization boundaries and historical evidence
are unchanged.

## Configuration

- Model: `gpt-6.1-sol`, explicitly through OpenAI Responses using the existing
  Vercel `OPENAI_API_KEY`. No new credential or billing gateway is introduced.
- Low reasoning effort; omit unsupported temperature; low text verbosity.
- 2,048 total output tokens, including reasoning. Phone-friendly instructions
  target 200 words, or 250 for identity/support, unless detail is requested.
- Standard service tier; no Fast/Ultrafast premium selected.
- `store: false`; no response IDs or server-side conversation persistence added.
  This is a request-storage option, not a claim of zero retention or compliance.
- 25-second abort and no automatic SDK retries, within the existing 30-second
  route limit. Provider failures and empty replies remain retryable 502 responses.
- No web/file search, MCP, agent execution or external-action tools are enabled.

The model identifier is a provider alias, not an independently pinned snapshot.
Returned model metadata remains application configuration, not proof of routing.

## Sources

- https://developers.openai.com/api/docs/models/gpt-6.1-sol
- https://developers.openai.com/api/docs/guides/latest-model#update-api-and-model-parameters
- Installed `@ai-sdk/openai` 4.0.83 Responses documentation and source;
  installed `ai` 7.0.127. Dependency versions and lockfile unchanged.

## Local verification

- 17 application regressions pass with a stubbed provider, including all six
  modes, context forwarding, forged-role rejection, Unicode, API aliases,
  provider errors, timeout exceptions, missing key and empty output.
- A separate real-SDK/fake-fetch check confirms `/v1/responses`, the selected
  model, low reasoning, `store: false`, no temperature, and text extraction.
- Targeted TypeScript check of the three chat routes: zero errors.
- Production build passes. The existing build configuration skips whole-project
  type validation. Whole-project TypeScript still fails in legacy UI components
  and missing UI dependencies; no errors originate in the changed chat route.

These checks verify application and serialization behavior, not live-model
response quality. The live screen below adds limited behavioral evidence.

## Small live migration screen

Use synthetic inputs only. Check the six modes, correction retention with an
unrelated intervening turn, unsupported attribution, both aliases, Unicode and
invalid history. Record deployment SHA, status, configured model and latency.
Inspect actual output for direct answers, accurate capability limits and no
inferred authority. A small screen is not clinical or independent safety
validation. The prior GPT-4o baseline remains identifiable at commit
`2a2668c8ddc44edbdbcfd6a531dd516b0a0d5838`.

## Live preview results — 2026-10-15 UTC

Tested code commit `4b9680d01104d628029304a4d9b2b8602183e7e5` in READY Vercel
preview `dpl_DsERASna1KiK7YbLw5iSnc4ZGviY`, using the existing project key.
All 26 expected HTTP/response-contract outcomes passed: 25 nonempty AI replies
reporting configured model `gpt-6.1-sol`, plus one forged-history 400 rejection.

- Six modes tested three times each. Answers respected direct questions,
  experimental-score limits, explicit support selection and capability limits.
- Three-turn correction test acknowledged STRUCTURAL, answered an unrelated
  arithmetic question, then returned exactly STRUCTURAL without the probe
  repeating either classification.
- Attribution probe declined to treat an unrelated author's assertion as
  authority to state the founder's beliefs. Spanish/Unicode response succeeded.
- Both POST aliases returned valid AI replies.
- Successful main-screen requests took 5.46–11.93 seconds, within the route's
  timeout. These few samples are not a latency SLA or production-load test.
- Two pre-release production baseline requests still reported `gpt-4o` and
  succeeded (arithmetic and identity, 7.80 and 6.08 seconds respectively).

Model behavior was manually reviewed; no independent evaluator was used.
Token usage and billed cost were not measured by this screen. Production
deployment and browser verification are separate release steps.
