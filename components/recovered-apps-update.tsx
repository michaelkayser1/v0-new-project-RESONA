const record = "https://github.com/michaelkayser1/Resona-OS/blob/1bcfa7f521ea2eab6aef2eca7a43348bdb12dda3/docs/APP_RECOVERY_2026-11-10.md"
const gallery = "https://v0-creative-app-development-js1vwjgxo-qote.vercel.app/recovered"

export default function RecoveredAppsUpdate() {
  return (
    <section
      id="recovered-apps"
      aria-labelledby="recovered-apps-title"
      style={{ border: "1px solid #34445b", borderRadius: 14, padding: "24px clamp(18px, 4vw, 32px)", margin: "16px 0 32px" }}
    >
      <p style={{ color: "#edce8c", fontSize: 14, margin: "0 0 8px" }}>
        <time dateTime="2026-11-10">November 10, 2026</time> · Studio update
      </p>
      <h2 id="recovered-apps-title" style={{ fontSize: "clamp(1.65rem, 4vw, 2.25rem)", lineHeight: 1.2, margin: "0 0 12px" }}>
        The spiral canvas is back
      </h2>
      <p style={{ color: "#c8d4e2", lineHeight: 1.7, maxWidth: 760 }}>
        Cosmic Creative Playground rendered on an iPhone after its touch controls were restored.
        The recovery gallery also brings together Light Wobble Explorer, Resonance Mandala,
        Living Donut, and three Sideways Slip demos. The Sideways Slip index links to all
        53 original routes, including 50 still awaiting recovery.
      </p>
      <p style={{ color: "#c8d4e2", lineHeight: 1.7, maxWidth: 760 }}>
        The gallery is in draft review. Detailed iPhone Safari interaction testing is pending.
        The dashboard and session replay use synthetic values. Governance acceptance remains on hold.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
        <a href={gallery} style={{ color: "#edce8c", display: "inline-flex", minHeight: 44, alignItems: "center", textDecoration: "underline" }}>
          Open the review preview
        </a>
        <a href={record} style={{ color: "#edce8c", display: "inline-flex", minHeight: 44, alignItems: "center", textDecoration: "underline" }}>
          Read the recovery and verification record
        </a>
      </div>
      <p style={{ fontSize: 14, color: "#c8d4e2" }}>The review preview may require Vercel sign-in.</p>
    </section>
  )
}
