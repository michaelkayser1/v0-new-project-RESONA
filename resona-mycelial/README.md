# Resona Mycelial

Distributed QOTE coherence node.

- **API**: `POST /api/coherence`
- **Input**:
  - `signal`: number[]
  - `sampling_rate` (optional)
  - `session_id` (optional)
- **Output**:
  - `coherence_ratio`
  - `in_corridor` (φ⁻¹ to 2/3)
  - `state` (`coherent`, `sub-harmonic`, `over-driven`)
  - `interpretation`
  - `framework: "QOTE"`

Designed for Vercel serverless / edge-style deployment as part of a
mycelial QOTE-Resona network.
