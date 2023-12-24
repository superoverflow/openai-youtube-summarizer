import { fetchAllVideos } from "@/app/lib/data"
import { YoutubeCard } from "@/app/ui/youtube-card"

export default async function Videos() {
    const videos = await fetchAllVideos()

    return (
        <div className="container mt-2 flex flex-wrap justify-center">
            {videos.map((video, index) => (
                <YoutubeCard key={index} videoId={video.video_id} />
            ))}
        </div>
    )
}