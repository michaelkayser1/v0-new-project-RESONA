import type { Metadata } from "next"
import AppsExplorer from "@/components/apps-explorer"
export const metadata: Metadata = { title:"App Studio | Kayser Medical + Resona", description:"Michael Kayser’s searchable collection of v0-built apps, prototypes, consoles, and interactive experiments." }
export default function AppStudio() {
  return <main style={{background:"#0b1528",color:"#f5f4ef",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
    <div style={{maxWidth:1120,margin:"0 auto",padding:"30px 22px 80px"}}>
      <nav aria-label="Studio navigation" style={{display:"flex",gap:22,flexWrap:"wrap",paddingBottom:30,borderBottom:"1px solid #34445b"}}>
        <a href="https://www.kayser-medical.com/" style={{color:"#edce8c"}}>Kayser Medical</a><a href="https://chat.kayser-medical.com/" style={{color:"#edce8c"}}>Resona</a>
        <a href="https://chat.kayser-medical.com/archive/creative" style={{color:"#edce8c"}}>Suno music</a><a href="https://chat.kayser-medical.com/archive/notebooks" style={{color:"#edce8c"}}>NotebookLM &amp; podcasts</a>
      </nav>
      <header style={{padding:"58px 0 16px"}}>
        <p style={{color:"#edce8c",letterSpacing:3,fontSize:12,textTransform:"uppercase"}}>The Kayser development collection</p>
        <h1 style={{fontSize:"clamp(2.8rem,7vw,5rem)",fontWeight:400,lineHeight:1.1,margin:"18px 0"}}>An idea. A prompt.<br/>An app to explore.</h1>
        <p style={{maxWidth:780,fontSize:19,lineHeight:1.7,color:"#c8d4e2"}}>Apps built by Michael Kayser with v0 AI—from governance consoles and oscillator experiments to creative tools and clinical concepts. Explore the work alongside the music and NotebookLM conversations.</p>
        <p style={{maxWidth:850,color:"#c8d4e2",lineHeight:1.7}}>These are prototypes and historical development artifacts. A completed build records deployment, not scientific validation, clinical readiness, or independent safety enforcement. Older apps may retain earlier claims; consult the <a style={{color:"#edce8c"}} href="/science-and-governance">current science and governance reference</a>. Project names organize the collection; they do not verify the app’s capabilities.</p>
      </header>
      <AppsExplorer />
      <footer style={{marginTop:48,paddingTop:24,borderTop:"1px solid #34445b",color:"#c8d4e2",lineHeight:1.7}}>Built with v0 AI. Curated by Michael A. Kayser. Access settings remain with each app. This directory does not invite submission of patient information or other sensitive records.</footer>
    </div>
  </main>
}
