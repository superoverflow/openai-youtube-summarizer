import { fetchAllVideos } from "@/app/lib/data"
import { YoutubeCard } from "@/app/ui/youtube-card"
import { YoutubeCardSkeleton } from "@/app/ui/youtube-card-skeleton"
import { Suspense } from "react"

export default async function Videos() {
    const videos = await fetchAllVideos()

    return (
        <div className="container mt-2 flex flex-wrap justify-center">
            {videos.map((video, index) => (
                <Suspense key={index} fallback={<YoutubeCardSkeleton />}>
                    <YoutubeCard key={index} videoId={video.video_id} />
                </Suspense>
            ))}
            
        </div>
    )
}