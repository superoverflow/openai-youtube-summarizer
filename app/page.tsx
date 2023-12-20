import { YoutubeCard } from "@/app/ui/youtube-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUrl } from "@/app/lib/actions";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    videoId?: string;
  };
}) {
  const videoId = searchParams?.videoId;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full flex-row items-center space-between font-mono">
        <form action={updateUrl} className="w-full flex items-center">
          <Input
            placeholder="Search for youtube videos to summarize"
            name="videoIdInput"
          />
          <Button type="submit" className="m-2">
            Search
          </Button>
        </form>
      </div>

      {videoId && <YoutubeCard videoId={videoId} />}
    </main>
  );
}
