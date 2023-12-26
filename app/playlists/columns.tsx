"use client"

import { ColumnDef } from "@tanstack/react-table"
import { differenceInDays } from "date-fns"

export type Playlist = {
  id: string   // channel or playlist id
  name: string // channel or playlist name
  thumbnail: string // 320x180
  lastUpdated: Date
}

export const columns: ColumnDef<Playlist>[] = [
  {
    accessorKey: "name",
    header: "Playlist",
    cell: ({ row }) => {
      const failbackThumbnail = "https://via.placeholder.com/320x180"
      const thumbnail = row.original.thumbnail || failbackThumbnail
      return (
        <div className="w-[160px]">
          <img className="rounded-sm" src={thumbnail} width={160} height={90} />
          <span className="text-sm text-gray-600 line-clamp-1 text-ellipsis text-center">{row.original.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.original.lastUpdated
      const daysAgo = differenceInDays(new Date(), date)
      return (
        <div className="text-sm text-gray-600 line-clamp-1 text-ellipsis text-center">{`${daysAgo} days ago`}</div>
      )
    }
  },
]

export const data: Playlist[] = [
  {
    id: "PLVbP054jv0KpV2leJ9HHIMqZEkCPX-iPV",
    name: "Mad Money",
    thumbnail: "https://i.ytimg.com/vi/dpDQ3bRxPYM/mqdefault.jpg",
    lastUpdated: new Date(2023, 11, 20)
  },
  {
    id: "PLGaYlBJIOoa9DV4I6sC8R8bX4L0Jq16XZ",
    name: "Stock Market News and Analysis",
    thumbnail: "https://i.ytimg.com/vi/k7q6QxS5_n0/mqdefault.jpg",
    lastUpdated: new Date(2023, 10, 12)
  },
  {
    id: "PL6iyqX0myJ2GvKOpg5kPsqReuehAfzRgs",
    name: "Verified Game Plan",
    thumbnail: "https://i.ytimg.com/vi/zLa6qdMAP6A/mqdefault.jpg",
    lastUpdated: new Date(2023, 10, 12)
  }
]