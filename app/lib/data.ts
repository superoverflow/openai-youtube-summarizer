import { YoutubeVideo } from "./definitions";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


export async function fetchYoutubeVideo(videoId: string) {
    const apiKey = YOUTUBE_API_KEY;
    const response = await fetch( 
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
    );
    const data = await response.json();
  
    const video: YoutubeVideo = data.items[0].snippet;
    return video
}
