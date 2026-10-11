import type { Metadata } from "next"
import ProjectRegistry from "@/components/project-registry"

export const metadata: Metadata = { title: "Research & Project Registry | Kayser Medical + Resona", description: "Canonical project IDs, source revisions, evidence status, deployment locations, reproducibility requirements, and limitations." }
export default function RegistryPage() {
 return <main style={{background:"#0b1528",color:"#f5f4ef",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}><div style={{maxWidth:1120,margin:"0 auto",padding:"30px 22px 80px"}}>
 <nav aria-label="Shared network navigation" style={{display:"flex",flexWrap:"wrap",gap:22}}><a href="https://www.kayser-medical.com/" style={{color:"#edce8c"}}>Kayser Medical</a><a href="https://chat.kayser-medical.com/" style={{color:"#edce8c"}}>Resona archive</a><a href="https://www.kayser-medical.com/science-and-governance" style={{color:"#edce8c"}}>Science & Rules</a><a href="/apps" style={{color:"#edce8c"}}>App studio</a></nav>
 <header style={{padding:"56px 0 24px"}}><p style={{color:"#edce8c",letterSpacing:2}}>KAYSER MEDICAL × RESONA</p><h1 style={{fontSize:"clamp(2.2rem,6vw,4rem)",lineHeight:1.1}}>Research & Project Registry</h1><p style={{maxWidth:800,lineHeight:1.7,color:"#c8d4e2"}}>One public record for identifying the work, finding its source, and seeing what the evidence can support. Project status, scientific evidence, professional credentials, and permission to act are separate records.</p></header>
 <ProjectRegistry />
 <footer style={{borderTop:"1px solid #34445b",marginTop:40,paddingTop:24,lineHeight:1.7}}><a href="https://www.kayser-medical.com/provenance/project-registry.json" style={{color:"#edce8c"}}>Versioned registry JSON</a><p>Corrections remain in the evidence record. Missing evidence stays open. This registry does not certify products, confirm current physician licensure, or confer authority.</p></footer>
 </div></main>
}

