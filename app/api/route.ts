export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const videoId = "zLa6qdMAP6A";
  const response = await fetch( 
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
  );
  const data = await response.json();

  const videoTitle = data.items[0].snippet.title;
  const body = JSON.stringify({ name: videoTitle });

  return new Response(body, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
