import ResourcePage from "@/components/resource-page"

export const metadata = { title: 'Research papers | Kayser Medical' }

export default function Page() {
  return <ResourcePage title='Research papers' description='Papers will be listed with source links, dates, and publication status when supplied.' category='Papers' notice='No public paper files are currently linked here. Browse the writing and software sections for available project material.' />
}
