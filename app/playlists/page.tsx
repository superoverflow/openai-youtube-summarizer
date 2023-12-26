import { Playlist, columns, data } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Playlist[]> {
  // Fetch data from your API here.
  return data
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
