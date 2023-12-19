import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('videoId')
  const response = await fetch( 
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
  );
  const data = await response.json();

  const video = data.items[0].snippet;
  const body = JSON.stringify(video);

  return new Response(body, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}