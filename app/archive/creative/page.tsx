import ResourcePage from "@/components/resource-page"

export const metadata = { title: 'Music & creative work | Kayser Medical' }

export default function Page() {
  return <ResourcePage title='Music & creative work' description='An archive of Michael Kayser’s AI-assisted music and development over time: 35 distinct song versions, plus his Suno profile. Alternate versions are preserved, including those with matching titles.' notice='Dates, model labels and available playback were read from public Suno pages on October 9, 2026. Displayed times have no stated timezone. Preview playback does not establish the full song length. Original prompts and edit histories have not been verified; the entries document the source metadata available today.' category='Music' />
}
