import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Science, Mathematics & Governance | Kayser Medical + Resona",
  description: "A shared, evidence-labeled reference for physics, mathematical models, AI governance and regulatory boundaries."
}

const sources = [
  {label:"NIST AI Risk Management Framework",url:"https://www.nist.gov/itl/ai-risk-management-framework",status:"Voluntary risk management guidance; not a certification"},
  {label:"FDA Clinical Decision Support Guidance (January 2026)",url:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software",status:"Applicability depends on actual software functionality and intended use"},
  {label:"HHS HIPAA Cloud Computing Guidance",url:"https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html",status:"BAA, security-rule and risk-assessment obligations apply when handling ePHI"},
  {label:"Resona-OS validation record",url:"https://github.com/michaelkayser1/Resona-OS/blob/main/docs/VALIDATION_STATUS.md",status:"Source-level status record; not independent certification"},
  {label:"Claims review branch",url:"https://github.com/michaelkayser1/Resona-OS/tree/review/claims-registry-v1",status:"Research registry and Source Audit 001; pending review/merge"}
]
const cards = [
  {title:"Forces & established physics", status:"Established framework", detail:"Gravity (general relativity), electromagnetism (Maxwell / quantum electrodynamics), strong interactions (quantum chromodynamics), and weak interactions (electroweak theory) have distinct experimentally supported formulations. No QOTE unification has been established."},
  {title:"Oscillations and mathematical models", status:"Mathematically defined / computational", detail:"Driven and damped oscillators and Kuramoto-type phase dynamics allow explicit stability, synchrony, and boundedness tests. Computational coherence is not physical or clinical validation."},
  {title:"Symmetry and the early universe", status:"Established principles, open cosmology", detail:"Symmetry breaking is a well-developed theoretical and experimental concept. The origin of the matter–antimatter asymmetry, dark matter, and dark energy remain unresolved scientific questions."},
  {title:"QOTE, rotating leptons and dark-sector hypotheses", status:"Exploratory / unverified", detail:"Electron–positron–neutrino structural concepts, force-unification proposals, and the dark-sector oscillation interpretation are hypotheses. They are not confirmed explanations for fundamental forces or cosmological observations."},
  {title:"CUST gating and Resona", status:"Experimental implementation", detail:"The Kuramoto order parameter R measures phase coherence, not truth, consent, or authority. CUST gate behavior, attention isolation, and claimed performance improvements remain OPEN pending a separately documented technical review. Source Audit 001 does not establish these technical findings."},
  {title:"Evidence and authorization", status:"Governance proposal", detail:"Observe → Speak → Adjudicate → Actuate. Evidence may inform a human decision, but models, coherence scores, and simulations cannot authorize their own consequential actions. The chat demo does not establish independent action-gate enforcement."}
]
export default function ScienceAndGovernance() {
  return <main style={{background:"#0b1528",color:"#f5f4ef",minHeight:"100vh",fontFamily:"system-ui, sans-serif"}}>
    <div style={{maxWidth:1080,margin:"0 auto",padding:"28px 22px 90px"}}>
      <nav aria-label="Shared network navigation" style={{display:"flex",gap:18,flexWrap:"wrap",alignItems:"center",paddingBottom:28,borderBottom:"1px solid #34445b"}}>
        <a style={{color:"#edce8c",fontWeight:700}} href="https://www.kayser-medical.com/">Kayser Medical</a>
        <a style={{color:"#edce8c",fontWeight:700}} href="https://chat.kayser-medical.com/">Resona AI Chat</a>
        <a style={{color:"#edce8c"}} href="https://github.com/michaelkayser1/Resona-OS">Research & validation</a>
      </nav>
      <header style={{padding:"64px 0 36px"}}>
        <p style={{color:"#edce8c",textTransform:"uppercase",letterSpacing:3,fontSize:12,fontWeight:700}}>Kayser Medical × Resona — shared research reference</p>
        <h1 style={{fontSize:"clamp(2rem,5vw,4rem)",lineHeight:1.1,margin:"16px 0"}}>Science, Mathematics, Physics & Governance</h1>
        <p style={{maxWidth:780,color:"#c8d4e2",fontSize:19,lineHeight:1.65}}>A common evidence framework for both sites. Our purpose is to preserve a research question without turning an analogy, simulation, or published manuscript into proof or regulatory approval.</p>
        <p style={{borderLeft:"3px solid #edce8c",paddingLeft:18,maxWidth:820,lineHeight:1.7}}>Origin may inspire theory. Theory may inspire models. Models may generate predictions. Predictions may motivate experiments. Experiments may produce evidence. Evidence may inform decisions. No layer authorizes its own promotion.</p>
      </header>
      <section aria-labelledby="origin" style={{marginBottom:42}}>
        <h2 id="origin" style={{fontSize:26}}>Origin is not evidence</h2>
        <p style={{color:"#c8d4e2",lineHeight:1.8}}>The swing observation—stopping, restarting, and asking what had already been moving—is a personal origin record and motivation for studying continued motion, feedback and stability. It is not a derivation of cosmology or particle physics.</p>
      </section>
      <section aria-labelledby="math" style={{marginBottom:42}}>
        <h2 id="math" style={{fontSize:26}}>Reference mathematics</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>
          <article style={{background:"#17263e",padding:22,borderRadius:14}}><h3>Classical oscillator</h3><p style={{fontFamily:"monospace",overflowWrap:"anywhere"}}>m x″ + b x′ + k x = F(t)</p><p style={{color:"#c8d4e2"}}>A mechanical model with inertia, damping, restoring force and external drive; not a cosmological derivation.</p></article>
          <article style={{background:"#17263e",padding:22,borderRadius:14}}><h3>Phase coherence</h3><p style={{fontFamily:"monospace",overflowWrap:"anywhere"}}>R = |(1/N) Σ exp(iθⱼ)|</p><p style={{color:"#c8d4e2"}}>Kuramoto's established order parameter, bounded 0 ≤ R ≤ 1; it measures synchronization only.</p></article>
          <article style={{background:"#17263e",padding:22,borderRadius:14}}><h3>Adaptive phases</h3><p style={{fontFamily:"monospace",overflowWrap:"anywhere"}}>θ̇ᵢ = ωᵢ + Σⱼ Aᵢⱼ Kᵢⱼ sin(θⱼ − θᵢ)</p><p style={{fontFamily:"monospace",overflowWrap:"anywhere"}}>K̇ᵢⱼ = −γ(Kᵢⱼ − K₀) + α cos(θⱼ − θᵢ)</p><p style={{color:"#c8d4e2"}}>An experimental dynamical model for simulation; it does not establish quantum gravity or safe autonomous action.</p></article>
        </div>
      </section>
      <section aria-labelledby="domains"><h2 id="domains" style={{fontSize:26}}>Claims and evidence status</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(295px,1fr))",gap:14}}>
          {cards.map(c=><article key={c.title} style={{border:"1px solid #34445b",borderRadius:14,padding:22}}>
            <p style={{color:"#edce8c",fontSize:12,fontWeight:700,textTransform:"uppercase"}}>{c.status}</p><h3 style={{fontSize:20}}>{c.title}</h3><p style={{color:"#c8d4e2",lineHeight:1.7}}>{c.detail}</p>
          </article>)}
        </div>
      </section>
      <section aria-labelledby="audit" style={{marginTop:45}}>
        <h2 id="audit" style={{fontSize:26}}>Source Audit 001 — scope and pending technical review</h2>
        <p style={{color:"#c8d4e2",lineHeight:1.75}}>Source Audit 001, dated October 9, 2026, is a review-draft source and deployment-metadata audit. It records repository and production-source mappings, earlier audit-chain withdrawals, the unlocated Witness Ledger suite, and unresolved public-surface reconciliation. It did not re-run application tests or conduct an independent scientific review.</p>
        <p style={{color:"#c8d4e2"}}>Correction — October 10, 2026: this page previously attributed QOTE2 equation, observational-agreement, force-mode, and CUST implementation/performance findings to Source Audit 001. The linked audit does not document those findings. Their use as verified evidence is BLOCKED until a separate technical record supplies exact source locations, analysis methods, and reproducible evidence. The underlying hypotheses remain OPEN. A successful deployment is not scientific validation.</p>
      </section>
      <section aria-labelledby="reg" style={{marginTop:45}}>
        <h2 id="reg" style={{fontSize:26}}>Regulatory agencies, standards & present status</h2>
        <p style={{color:"#c8d4e2",lineHeight:1.7}}>Michael A. Kayser, DO, FACMG has a clinical genetics professional background. Individual licensure, specialty credentials, institutional authorizations, and clinical scope must be independently checked for any offered clinical service. Historical CLIA/laboratory experience is not a current CLIA certificate for these websites or products.</p>
        <ul style={{paddingLeft:24,lineHeight:1.9,color:"#c8d4e2"}}>
          <li><strong style={{color:"white"}}>ABMGG / professional credentials:</strong> credential claims require current primary-source confirmation; no credential is conferred by this site.</li>
          <li><strong style={{color:"white"}}>State medical boards / telehealth:</strong> verify active patient-location licensure and applicable standards before care; multi-state authorization is not asserted.</li>
          <li><strong style={{color:"white"}}>CMS / CLIA:</strong> clinical laboratory certification is facility- and testing-specific; external-lab workflows do not certify Resona.</li>
          <li><strong style={{color:"white"}}>HHS / OCR HIPAA:</strong> privacy, security, access controls, BAAs, and risk management are requirements when handling regulated patient information; compliance is not automatically established by vendor agreements.</li>
          <li><strong style={{color:"white"}}>FDA:</strong> software intended uses and functions determine whether CDS is a regulated device. No FDA clearance or approval is claimed.</li>
          <li><strong style={{color:"white"}}>FTC / state consumer protection:</strong> advertising must be truthful and substantiated; avoid performance and certification claims unsupported by evidence.</li>
          <li><strong style={{color:"white"}}>NIST AI RMF:</strong> voluntary risk-governance framework used as a reference, not a compliance license or certification.</li>
        </ul>
        <div style={{display:"grid",gap:12,marginTop:20}}>{sources.map(s=><a key={s.url} href={s.url} rel="noopener noreferrer" target="_blank" style={{border:"1px solid #34445b",borderRadius:10,padding:14,color:"#edce8c"}}>{s.label}<span style={{display:"block",color:"#c8d4e2",fontSize:13,marginTop:4}}>{s.status}</span></a>)}</div>
      </section>
      <footer style={{borderTop:"1px solid #34445b",marginTop:54,paddingTop:22,color:"#c8d4e2",lineHeight:1.7}}>Kayser Medical × Resona | Research and advisory disclosure. No independent scientific certification, FDA approval, clinical diagnostic service through this page, or autonomous authorization is implied. <a href="https://www.kayser-medical.com/" style={{color:"#edce8c"}}>Kayser Medical</a> · <a href="https://chat.kayser-medical.com/" style={{color:"#edce8c"}}>Resona Chat</a></footer>
    </div>
  </main>
}
