import type { Metadata } from "next"
import SitePage from "@/components/site-page"

export const metadata: Metadata = {
  title: "RESONA OSAA Experimental Update | November 7, 2026",
  description: "Dated status of proposed RESONA governance controls and the isolated local mock tests; no production authorization is implied.",
}

export default function GovernanceUpdate() {
  return <SitePage title="RESONA — Experimental Governance Update" intro="November 7, 2026 · OSAA implementation extension · status: HOLD for production">
    <section className="rounded-xl border border-border bg-card p-6 space-y-3">
      <h2 className="text-2xl font-semibold">Capability ≠ Authority</h2>
      <p>Increased model intelligence, compute, confidence, or past success does not grant permission to execute consequential actions. Observe → Speak → Adjudicate → Actuate separates proposed actions, policy decisions, destination enforcement, and outcome evidence.</p>
      <p><strong>Frozen baseline:</strong> RS-001 v1.2 remains unchanged. The 2026.11.07-r1 implementation note is a proposed experimental extension, not an independently verified control or production deployment.</p>
    </section>
    <section className="rounded-xl border border-border bg-card p-6 space-y-3">
      <h2 className="text-2xl font-semibold">Engineering record, not certification</h2>
      <p>An isolated SQLite/Python reference mock was reported with 10 local passing tests on November 7, 2026. Those tests exercise selected authorization, replay, transaction, and reserve-admission behaviors. They do not establish that this chat's actions are destination-gated, that witnesses are independent, or that live infrastructure passed the complete eight-test adversarial suite.</p>
      <p>Admission is not execution. An admitted request may have an unknown external outcome. RELEASE still requires separate, scoped authorization and independently inspectable results.</p>
      <p><strong>Remaining:</strong> commissioning gate, broker trust analysis, independent witness custody, interrupted-operation reconciliation, human review exhaustion, and HOLD-with-record trajectory preservation.</p>
    </section>
    <section className="rounded-xl border border-border bg-card p-6 space-y-2">
      <h2 className="text-2xl font-semibold">Evidence and status</h2>
      <p>Proposed controls: credential-safe persistence; signed, scoped authorization; protected machine and human recovery reserves; compute envelopes; evidence-chain independence; explicit revocation. The eight Rev 1 tests are specified, not all executed in an independently validated environment.</p>
      <p><strong>Disposition:</strong> Candidate / experimental. Independent validation pending. Production enforcement release not authorized. Meaning: Pending. Quiet With Receipts.</p>
      <a className="text-primary underline" href="https://github.com/michaelkayser1/Resona-OS/blob/main/docs/VALIDATION_STATUS.md">Read the research validation-status record</a>
      <p><a className="text-primary underline" href="https://www.kayser-medical.com/science-and-governance">Shared science and governance reference</a></p>
    </section>
  </SitePage>
}
