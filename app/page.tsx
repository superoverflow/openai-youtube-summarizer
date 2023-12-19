"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("/api/dummy");
      const data = await resp.json();
      setData(data);
    }
    fetchData();
  }, []);

  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full flex-row items-center space-between font-mono">
        <Input placeholder="Search for youtube videos to summarize" />
        <Button className="m-2">Search</Button>
      </div>
      {data && (
        <div className="flex flex-col items-center justify-center">
          <img src={data.image} width={100} height={200} />
          <p className="text-sm">{data.title}</p>
          <p className="text-sm">
            <span>
              Market Sentiment:
              {data.sentiment.market_sentiment}
            </span>
          </p>
        </div>
      )}
    </main>
  );
}
