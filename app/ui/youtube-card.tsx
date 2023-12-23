import { fetchSentiment, fetchYoutubeVideo } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function YoutubeCard({ videoId }: { videoId: string }) {
  const video = await fetchYoutubeVideo(videoId);
  // const sentiment = await fetchSentiment(videoId);
  const thumbnails = video.thumbnails.default;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
        <CardDescription>{video.publishedAt}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={thumbnails.url}
          height={thumbnails.height}
          width={thumbnails.width}
        />
        {/* <code>{JSON.stringify(sentiment)}</code> */}
      </CardContent>
    </Card>
  );
}
