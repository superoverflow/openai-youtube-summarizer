"use client"

import { ColumnDef } from "@tanstack/react-table"
import { differenceInDays } from "date-fns"

export type Playlist = {
  playlistId: string
  playlistName: string
  playlistThumbnail: string
  channelId: string
  channelTitle: string
  channelThumbnail: string
  lastUpdated: Date
}

export const columns: ColumnDef<Playlist>[] = [
  {
    accessorKey: "name",
    header: "Playlist",
    cell: ({ row }) => {
      const failbackThumbnail = "https://via.placeholder.com/320x180"
      const thumbnail = row.original.playlistThumbnail || failbackThumbnail
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
    playlistId: "PLVbP054jv0KpV2leJ9HHIMqZEkCPX-iPV",
    playlistName: "Mad Money",
    playlistThumbnail: "https://i.ytimg.com/vi/dpDQ3bRxPYM/mqdefault.jpg",
    channelId: "UCrp_UI8XtuYfpiqluWLD7Lw",
    channelTitle: "CNBC Television",
    channelThumbnail: "https://yt3.ggpht.com/WhC1oycyrx_oXiMM1EeRZm6sWBA1ciHeyeuIkQuDuK2aeQBbLIkfshKIHJuUjD7d1w-gq4AqlyU=s240-c-k-c0x00ffffff-no-rj",
    lastUpdated: new Date(2023, 11, 20)
  },
  {
    playlistId: "PLGaYlBJIOoa9DV4I6sC8R8bX4L0Jq16XZ",
    playlistName: "Stock Market News and Analysis",
    playlistThumbnail: "https://i.ytimg.com/vi/k7q6QxS5_n0/mqdefault.jpg",
    channelId: "UCIALMKvObZNtJ6AmdCLP7Lg",
    channelTitle: "Bloomberg Television",
    channelThumbnail: "https://yt3.ggpht.com/-kcohSPXknvrybix3K6ayjkT3_vn0Hily7cED3KwrlYzXYNzTXrgmg4ea04Yurmzkgk04A6j3Rg=s240-c-k-c0x00ffffff-no-rj",
    lastUpdated: new Date(2023, 10, 12)
  },
  {
    playlistId: "PL6iyqX0myJ2GvKOpg5kPsqReuehAfzRgs",
    playlistName: "Verified Game Plan",
    playlistThumbnail: "https://i.ytimg.com/vi/zLa6qdMAP6A/mqdefault.jpg",
    channelId: "UCwTu6kD2igaLMpxswtcdxlg",
    channelTitle: "Gareth Soloway",
    channelThumbnail: "https://yt3.ggpht.com/HWS-5pene2VjoJv-rJtVURH1GY3JkBOOCl5zXR0TWfQLXhxuqDZOxNd5xumrfUnJKpXkMFZd5VY=s240-c-k-c0x00ffffff-no-rj",
    lastUpdated: new Date(2023, 10, 12)
  },
  {
    playlistId: "PLx28zU8ctIRqOeHHeH2EzlPvNrp9Zjte0",
    playlistName: "Latest News and Business Insights",
    playlistThumbnail: "https://i.ytimg.com/vi/iu94xaD3Ors/mqdefault.jpg",
    channelId: "UCEAZeUIeJs0IjQiqTCdVSIg",
    channelTitle: "Yahoo Finance",
    channelThumbnail: "https://yt3.ggpht.com/xQSa0-v8cp8qlUpogSJFeAC4ryeMZG90l3f4ImDCMCoHNhN74S6cZ1kFsIl2et3EQN_aiyjk=s240-c-k-c0x00ffffff-no-rj",
    lastUpdated: new Date(2023, 10, 12)
  }
]