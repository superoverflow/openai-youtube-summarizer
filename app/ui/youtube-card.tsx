import { fetchAndCacheYoutubeVideo } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { RunAnalysisButton } from "@/app/ui/run-analysis-button";
import { SentimentIconContainer } from "@/app/ui/sentiment-icon";
import { format } from 'date-fns';
import { CiCalendar, CiClock1 } from "react-icons/ci";

const formatDuration = (duration: string) => {
  const [hour, min] = duration.replace(/PT((\d+)H)?((\d+)M)?((\d+)S)?/, "$2,$4").split(",");
  const hourStr = hour ? `${hour}h` : "";
  const minStr = min ? `${min}m` : "";
  return `${hourStr} ${minStr}`;
}


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
              <CiCalendar className="mr-1" />
              <span className="grow">
                {publishedAt}
              </span>
              <CiClock1 className="mr-1 ml-2" />
              <span>
                {formatDuration(video.duration)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!!video.market_sentiment ?
                <SentimentIconContainer sentiment={video.market_sentiment} />
                : <RunAnalysisButton video={video} processed={false} />
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
