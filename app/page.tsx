import { YoutubeCard } from "@/app/ui/youtube-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <Input placeholder="Search for youtube videos to summarize" />
        <Button className="m-2">Search</Button>
      </div>

      {videoId && <YoutubeCard videoId={videoId} />}
    </main>
  );
}
