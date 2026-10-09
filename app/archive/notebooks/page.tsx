import ResourcePage from "@/components/resource-page"

export const metadata = { title: "Shared notebooks | Kayser Medical" }

export default function Page() {
  return <ResourcePage title="Michael’s shared notebooks" description="Browse the 28 notebook links Michael Kayser supplied for this site." category="Notebook" notice="Links are numbered in the order Michael supplied them. Notebook titles and contents could not be retrieved during verification; open a notebook in Google to view them. This site links to the notebooks and does not copy their sources or generated materials." />
}
