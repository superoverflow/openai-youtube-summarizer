import { searchYoutubeVideos } from "@/app/lib/data"
import { YoutubeCard } from "@/app/ui/youtube-card"
import { Suspense } from "react"
import { YoutubeCardSkeleton } from "./youtube-card-skeleton"

export async function SearchResult({ query }: { query?: string }) {
  if (query === undefined) {
    return <></>
  }
  const videoIds = await searchYoutubeVideos(query)

  return (
    <Suspense fallback={<YoutubeCardSkeleton />}>
      {videoIds.map((videoId) => (
        <YoutubeCard
          key={videoId}
          videoId={videoId}
        />
      ))}
    </Suspense>
  )
}