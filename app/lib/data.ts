import { YoutubeVideoAPIResponse, YoutubeVideo } from "./definitions";
import { sql } from "@vercel/postgres";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchYoutubeVideoFromAPI(videoId: string) {
  const apiKey = YOUTUBE_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
  );
  const data = await response.json();

  const videoObject: YoutubeVideoAPIResponse = data.items[0].snippet;
  const video: YoutubeVideo = {
    video_id: videoId,
    title: videoObject.title,
    published_at: videoObject.publishedAt,
    thumbnail_url: videoObject.thumbnails.default.url,
    channel_id: videoObject.channelId,
  };
  return video;
}

async function fetchYoutubeVideosFromDB(videoId: string) {
  const { rows } = await sql<YoutubeVideo>`
    SELECT 
      video_id,
      title, 
      published_at, 
      thumbnail_url, 
      channel_id, 
      transcript, 
      market_sentiment
    FROM youtube_videos
    WHERE video_id = ${videoId};`;
  if (rows.length > 0) return rows[0];
  return null;
}

async function saveYoutubeVideo(video: YoutubeVideo) {
  sql`
  INSERT INTO youtube_videos (video_id, title, published_at, thumbnail_url)
  VALUES (${video.video_id}, ${video.title}, ${video.published_at}, ${video.thumbnail_url})
  ON CONFLICT (video_id) DO NOTHING
`;
}

export async function fetchAndCacheYoutubeVideo(videoId: string) {
  const videoFromDB = await fetchYoutubeVideosFromDB(videoId);
  if (videoFromDB != null) {
    return videoFromDB;
  }

  const video = await fetchYoutubeVideoFromAPI(videoId);
  saveYoutubeVideo(video);
  return video;
}


export async function fetchAllVideos(offset: number = 0, limit: number = 10) {
  const { rows } =
    await sql<{ video_id: string }>`select video_id from youtube_videos limit ${limit} offset ${offset}`
  return rows
}