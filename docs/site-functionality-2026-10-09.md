# Site functionality repair — 2026-10-09

The live review found working page routes but inert archive controls, unsupported static inventory/clinical claims, a failing enhanced chat, and a canned legacy endpoint.

## Changes

- All chat POST endpoints now use the validated main route. `/enhanced` redirects to `/chat`; legacy persistent-session/analytics requests return an explicit 410.
- Main public analytics returns aggregate counters only, never recent conversation text.
- Scoring facts and the computed current-message breakdown are supplied as explanation context only. Scores cannot trigger support or set reply tone. The scoring formula is unchanged; quoted `no` counts as a negative signal and absence of matching terms is a 50% default.
- Shared archive search, category selection, empty states, clear search, and incremental display operate on six public destinations. No invented transcripts, readings, players, counts, publication statuses, or clinical metrics remain on rendered archive pages.
- Homepage, research, about, governance, support, and metadata distinguish research, creative work, conversational AI, and governance. Unsupported validation/theological/clinical claims and unimplemented paid access promises are removed. Original copy remains in Git history.
- `/resona` is a dedicated governance page, not a redirect to the chat. Already-cached permanent redirects may persist in an existing browser until its cache expires.
- Suno uses the screenshot-supplied handle `@michaelkayser155`. External playback is on Suno; requests from this review environment returned 403, so account/playback availability has not been independently verified.
- Substack links were supplied by Michael; this environment returns an unavailable page, so public rendering of those destinations remains unverified.
- Notebook integration accepts an owner-supplied HTTPS notebook URL via `PUBLIC_NOTEBOOK_URL`, rejects credentials/query tokens/unapproved hosts, and requires rebuild. No notebook URL was present in the supplied account screenshot, so no private notebook is published or linked yet.

## Validation

- 12 tests cover correction/context boundaries, scoring distinctions, API aliases, analytics disclosure, archive filters, and notebook URL validation.
- Production Next.js build passes.
- TypeScript reports no errors in changed files; 52 pre-existing errors remain in unused UI/legacy components. Existing build-time type validation bypass remains unchanged.
- Browser testing of the deployed change is required before declaring the live site repaired.
