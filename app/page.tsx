import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full items-center justify-between font-mono flex-row">
        <p>
          Search a youtube video to Summarizer
          <Button>Search</Button>
        </p>
      </div>
    </main>
  );
}
