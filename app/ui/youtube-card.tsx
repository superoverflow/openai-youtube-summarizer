import { fetchAndCacheYoutubeVideo } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { RunAnalysisButton } from "@/app/ui/run-analysis-button";
import { SentimentIcon } from "@/app/ui/sentiment-icon";
import { format } from 'date-fns';
import { CiCalendar } from "react-icons/ci";

export async function YoutubeCard({ videoId }: { videoId: string }) {
  const video = await fetchAndCacheYoutubeVideo(videoId);
  const thumbnails = video.thumbnail_url;
  const publishedAt = format(video.published_at, 'yyyy-MM-dd');
  return (
    <Card className="w-[320px] h-[180px] m-1">
      <CardHeader>
        <CardDescription>
          <span className="text-ellipsis line-clamp-2">{video.title}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <img
            className="rounded-md mr-2"
            src={thumbnails}
            height={120}
            width={90}
          />
          <div className="flex flex-col w-full">
            <div className="mt-1 text-sm text-gray-500 flex items-center">
              <CiCalendar className="mr-2" />
              <span className="grow">
                {publishedAt}
              </span>
              <SentimentIcon sentiment={video.market_sentiment} />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <RunAnalysisButton videoId={videoId} processed={!!video.market_sentiment} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
