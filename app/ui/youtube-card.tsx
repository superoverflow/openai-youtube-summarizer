import { fetchAndCacheYoutubeVideo } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { CiCalendar } from "react-icons/ci";
import { IoPartlySunnySharp } from "react-icons/io5";
import { PiCheckFatFill } from "react-icons/pi";
import { processVideo } from "@/app/lib/actions";


export async function YoutubeCard({ videoId }: { videoId: string }) {
  const video = await fetchAndCacheYoutubeVideo(videoId);
  const thumbnails = video.thumbnail_url;
  const publishedAt = format(video.published_at, 'yyyy-MM-dd');
  const processVideoId = processVideo.bind(null, videoId)
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
              <IoPartlySunnySharp className="mr-1" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <form action={processVideoId}>
                <Button className="w-full" variant="outline">
                  <PiCheckFatFill className="mr-2 h-4 w-4" />Run Analysis
                </Button></form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
