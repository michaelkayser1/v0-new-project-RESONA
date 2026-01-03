# Research Export — Layer 8

**Transform daily usage into publishable research data**

---

## Overview

The Research Export system converts Resona Dashboard sessions into **anonymized, reproducible research datasets** with complete metadata for validation and publication.

### Key Features

- **One-click export** — No manual data wrangling
- **Automatic anonymization** — PII removal by default
- **Complete metadata** — System version, metric definitions, parameters
- **Multiple formats** — JSON, JSONL, CSV
- **Reproducible by design** — All results can be independently validated

---

## Export Formats

### JSON (Recommended for analysis)

Single file with complete export:

```json
{
  "metadata": {
    "export_id": "uuid",
    "export_timestamp": "2026-01-03T...",
    "system_version": "2.0.0",
    "coherence_parameters": {
      "lower_bound": 0.618,
      "upper_bound": 0.6667,
      "corridor_type": "QOTE (φ⁻¹ to 2/3)"
    },
    "metric_definitions": {
      "coherence": "C(S) = (orientation × interruptResistance × stability) - drift - contradictions",
      ...
    }
  },
  "sessions": [...],
  "events": [...],
  "checkpoints": [...],
  "return_mappings": [...],
  "incidents": [...]
}
```

### JSONL (Line-delimited, streaming-friendly)

Multiple files:
- `metadata.json` — Export metadata
- `sessions.jsonl` — One session per line
- `events.jsonl` — One event per line
- `checkpoints.jsonl` — One checkpoint per line
- `return_mappings.jsonl` — One mapping per line
- `incidents.jsonl` — One incident per line

### CSV (Spreadsheet-compatible)

Multiple files for easy analysis in Excel/Google Sheets:
- `sessions.csv`
- `events.csv`
- `checkpoints.csv`
- `return_mappings.csv`
- `incidents.csv`

---

## Anonymization

### What Gets Anonymized

By default, all exports are anonymized:

| Field | Original | Anonymized |
|-------|----------|------------|
| Actor ID | `alice@company.com` | `actor_1234` |
| Actor Name | `Alice Smith` | `actor_5678` |
| Email addresses | `user@example.com` | `[EMAIL]` |
| Phone numbers | `555-1234` | `[PHONE]` |
| URLs | `https://private.com/...` | `[URL]` |
| Names in text | `John Doe` | `[NAME]` |

### What's Preserved

- **Session structure** — All timing, relationships
- **Event types** — Exact event taxonomy
- **Metrics** — All C(S) calculations
- **Patterns** — Goal drift, interrupts, coherence trends
- **Outcomes** — R validation results, incidents

### Custom Anonymization

```typescript
// Disable anonymization (use with care)
POST /api/resona/export
{
  "anonymize": false,  // Keep original data
  "include_payloads": true  // Include full event payloads
}
```

---

## API Usage

### Export Current Session

```bash
curl -X POST http://localhost:3000/api/resona/export \
  -H "Content-Type: application/json" \
  -d '{
    "session_ids": ["session-uuid"],
    "format": "json",
    "anonymize": true
  }'
```

### Export Date Range

```bash
curl -X POST http://localhost:3000/api/resona/export \
  -H "Content-Type: application/json" \
  -d '{
    "start_date": "2026-01-01",
    "end_date": "2026-01-31",
    "format": "jsonl",
    "anonymize": true
  }'
```

### Get Export Metadata

```bash
# List all exportable sessions
curl http://localhost:3000/api/resona/export

# Response:
{
  "sessions": [
    {
      "session_id": "uuid",
      "actor_type": "human",
      "actor_id": "alice",
      "started_at": "2026-01-03T...",
      "counts": {
        "events": 142,
        "checkpoints": 5,
        "return_mappings": 8,
        "incidents": 2
      }
    }
  ]
}
```

---

## Dashboard UI

The Research Export Panel appears in the bottom-right of the dashboard:

1. **Select format** — JSON, JSONL, or CSV
2. **Configure options** — Anonymize, include payloads
3. **Choose sessions** — Current or historical
4. **Export** — Downloads automatically

---

## Metadata Structure

Every export includes complete metadata for reproducibility:

```json
{
  "export_id": "unique-id",
  "export_timestamp": "ISO-8601",
  "system_version": "2.0.0",
  "data_version": "1.0.0",
  "anonymization_applied": true,
  "session_count": 10,
  "event_count": 1543,
  "time_range": {
    "start": "2026-01-01T00:00:00Z",
    "end": "2026-01-31T23:59:59Z"
  },
  "coherence_parameters": {
    "lower_bound": 0.618,
    "upper_bound": 0.6667,
    "corridor_type": "QOTE (φ⁻¹ to 2/3)"
  },
  "metric_definitions": {
    "coherence": "C(S) = (orientation × interruptResistance × stability) - drift - contradictions",
    "orientation": "Goal alignment ratio [0,1]",
    "interrupt_cost": "Normalized average interrupt duration [0,1]",
    "volatility": "Coefficient of variation of event rate [0,1]",
    "drift": "Goal change frequency over time [0,1]",
    "contradiction_rate": "Tool call retry loop frequency [0,1]"
  },
  "validation_thresholds": {
    "min_goal_similarity": 0.7,
    "min_continuity_score": 0.6
  }
}
```

---

## Research Use Cases

### 1. Self-Analysis

Export your own sessions to:
- Identify coherence patterns
- Correlate interrupts with outcomes
- Track improvement over time
- Validate QOTE corridor bounds

### 2. Publication

Use exports for:
- Method sections (metric definitions included)
- Results (reproducible calculations)
- Figures (deterministic from data)
- Supplementary materials (full datasets)

### 3. Validation Studies

Compare:
- Human vs agent coherence
- Different corridor parameters
- Alternative C(S) formulations
- Cross-session patterns

### 4. Educational Materials

Anonymized exports become:
- Case studies for teaching
- Example datasets for workshops
- Baseline comparisons for students

---

## Privacy & Ethics

### Default: Research-Grade Privacy

- **No PII** in anonymized exports
- **Opt-in** for non-anonymized data
- **Local-first** — Your data stays in your database
- **Transparent** — No hidden inference, profiling, or scoring

### Ethical Advantages

1. **No black boxes** — All metrics formally defined
2. **No permanent labels** — Sessions are events, not identities
3. **Reversible** — Rollback is architectural, not political
4. **Shareable** — Anonymized by default enables collaboration

---

## Integration Examples

### Python Analysis

```python
import json
import pandas as pd

# Load export
with open('resona_export.json') as f:
    data = json.load(f)

# Convert to DataFrames
events = pd.DataFrame(data['events'])
checkpoints = pd.DataFrame(data['checkpoints'])

# Analyze coherence over time
events['ts'] = pd.to_datetime(events['ts'])
events_by_hour = events.groupby(events['ts'].dt.hour).size()

print(f"Peak activity hour: {events_by_hour.idxmax()}")
```

### R Analysis

```r
library(jsonlite)
library(tidyverse)

# Load export
data <- fromJSON("resona_export.json")

# Analyze return mapping success rate
r_success <- data$return_mappings %>%
  count(status) %>%
  mutate(pct = n / sum(n) * 100)

print(r_success)
```

### Julia Analysis

```julia
using JSON
using DataFrames
using Statistics

# Load export
data = JSON.parsefile("resona_export.json")

# Calculate mean coherence by actor type
events = DataFrame(data["events"])
mean_coherence = combine(groupby(events, :actor_type),
                        :coherence_estimate => mean)

println(mean_coherence)
```

---

## File Naming Convention

Exports follow this pattern:

```
resona_export_YYYYMMDD_HHMMSS.{json,jsonl,csv}
```

Example:
```
resona_export_20260103_143022.json
resona_export_20260103_143022_sessions.jsonl
resona_export_20260103_143022_events.csv
```

---

## Next Steps

Once you have exported data:

1. **Validate metrics** — Recalculate C(S) independently
2. **Visualize patterns** — Generate your own figures
3. **Compare cohorts** — Human vs agent, pre vs post intervention
4. **Publish** — Metadata makes results reproducible
5. **Share** — Anonymized data can be published as supplementary materials

---

## Example: Publishing a Paper

**Methods Section (auto-generated):**

> Data was collected using Resona Dashboard v2.0.0. Coherence was calculated as C(S) = (orientation × interruptResistance × stability) - drift - contradictions, with corridor bounds [0.618, 0.6667] based on QOTE principles. All metric definitions and validation thresholds are documented in the export metadata.

**Reproducibility Statement:**

> Complete anonymized datasets and metadata are available at [repository]. All analyses can be reproduced using the provided export files with system version 2.0.0.

---

## Implementation Details

### Export Service (`lib/research/export-service.ts`)

- **Anonymization** — PII removal with configurable depth
- **Metadata generation** — Auto-attached to every export
- **Format conversion** — JSON → JSONL → CSV
- **Session filtering** — By ID or date range

### API Endpoint (`app/api/resona/export/route.ts`)

- `POST /api/resona/export` — Generate export
- `GET /api/resona/export` — List exportable sessions

### UI Component (`components/resona/research-export-panel.tsx`)

- Session selection
- Format picker
- Privacy controls
- One-click download

---

## FAQ

**Q: Is the data really anonymized?**
A: Yes. All PII (emails, names, URLs, phone numbers) is replaced with placeholders. Actor IDs are hashed.

**Q: Can I export without anonymization?**
A: Yes, set `anonymize: false` in the API call. Use with caution.

**Q: What if I want to keep payloads?**
A: Set `include_payloads: true`. They will still be anonymized if `anonymize: true`.

**Q: Can I export just one session?**
A: Yes, use `session_ids: ["uuid"]` in the request.

**Q: How do I cite this data?**
A: Include the `export_id` and `system_version` from metadata. Example:
> Data exported from Resona Dashboard v2.0.0 (export ID: abc-123...)

**Q: Is this GDPR compliant?**
A: Anonymized exports contain no personally identifiable information, making them GDPR-safe to share.

---

## Summary

**What you get:**
- Research-grade exports with one click
- Complete reproducibility metadata
- Privacy by default (anonymized)
- Multiple formats for any tool

**Why it matters:**
- Daily life becomes publishable data
- No post-hoc storytelling possible
- Science emerges naturally from usage
- Collaboration without privacy concerns

**No mysticism. Just exportable intelligence.**

---

**Built with QOTE principles**
*Reproducible by design*
