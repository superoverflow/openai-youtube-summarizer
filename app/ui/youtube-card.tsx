import { fetchAndCacheYoutubeVideo } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'date-fns';


export async function YoutubeCard({ videoId }: { videoId: string }) {
  const video = await fetchAndCacheYoutubeVideo(videoId);
  const thumbnails = video.thumbnail_url;
  const publishedAt = format(video.published_at, 'yyyy-MM-dd');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
        <CardDescription>{publishedAt}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={thumbnails}
          height={120}
          width={90}
        />
      </CardContent>
    </Card>
  );
}
