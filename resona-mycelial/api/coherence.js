// QOTE Coherence Endpoint
// GET  /api/coherence -> simple status
// POST /api/coherence { signal: number[], sampling_rate?: number, session_id?: string }

module.exports = (req, res) => {
  // Handle CORS / JSON basics
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      framework: "QOTE",
      message: "Resona mycelial node is online.",
      corridor: {
        phi_inverse: 1 / 1.61803398875,
        two_thirds: 2 / 3
      }
    });
  }

  if (req.method === 'POST') {
    try {
      const { signal, sampling_rate, session_id } = req.body || {};

      if (!Array.isArray(signal) || signal.length === 0) {
        return res.status(400).json({
          ok: false,
          error: "Missing or invalid 'signal' array."
        });
      }

      // Basic coherence metric: mean of signal
      const sum = signal.reduce((a, b) => a + Number(b), 0);
      const mean = sum / signal.length;

      const phiInv = 1 / 1.61803398875; // ≈0.618
      const twoThirds = 2 / 3;          // ≈0.6667

      const in_corridor = mean >= phiInv && mean <= twoThirds;

      const state = in_corridor
        ? "coherent"
        : (mean < phiInv ? "sub-harmonic" : "over-driven");

      const interpretation = in_corridor
        ? "Within optimal QOTE coherence corridor (φ⁻¹ to 2/3)."
        : (mean < phiInv
          ? "Below φ⁻¹: system under-coupled, consider stabilizing inputs."
          : "Above 2/3: system over-coupled, consider diffusing or grounding.");

      return res.status(200).json({
        ok: true,
        framework: "QOTE",
        session_id: session_id || null,
        sampling_rate: sampling_rate || null,
        coherence_ratio: Number(mean.toFixed(4)),
        in_corridor,
        state,
        interpretation
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: "Internal error computing coherence.",
        details: String(err)
      });
    }
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
};
