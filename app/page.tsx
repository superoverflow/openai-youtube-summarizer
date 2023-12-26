import { SearchResult } from "@/app/ui/youtube-search-result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchVideos } from "@/app/lib/actions";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";

import { Suspense } from "react";


export default function Home({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const q = searchParams?.q;
  return (
    <main className="flex flex-col items-center justify-between container mx-auto p-4">
      <div className="mt-2 flex w-full flex-row items-center font-mono">
        <form action={searchVideos} className="w-full flex items-center">
          <Input
            placeholder="Search for youtube videos"
            name="search"
          />
          <Button type="submit" className="m-2">
            <FaMagnifyingGlass />
          </Button>
        </form>
      </div>
      <div className="mt-2 flex flex-row flex-wrap">
      <Suspense fallback={<AiOutlineLoading className="mx-auto mt-2 animate-spin" />}>
        <SearchResult query={q}/>
      </Suspense>
      </div>
    </main>
  );
}
