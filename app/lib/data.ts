import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { YoutubeTranscript } from "youtube-transcript";
import { YoutubeVideoAPIResponse, YoutubeVideo, Sentiment } from "./definitions";
import OpenAI from "openai";
import { sql } from "@vercel/postgres";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const PROMPT = "You analyze speech and summarize overall stock market sentiment in one word: Bullish, Neutral, or Bearish."

async function fetchYoutubeVideoFromAPI(videoId: string) {
  const apiKey = YOUTUBE_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&part=contentDetails&id=${videoId}`
  );
  const data = await response.json();

  const videoObject: YoutubeVideoAPIResponse = data.items[0].snippet;
  const video: YoutubeVideo = {
    video_id: videoId,
    title: videoObject.title,
    published_at: videoObject.publishedAt,
    thumbnail_url: videoObject.thumbnails.default.url,
    channel_id: videoObject.channelId,
    duration: data.items[0].contentDetails.duration
  };
  return video;
}

async function fetchYoutubeVideosFromDB(videoId: string) {
  noStore();
  const { rows } = await sql<YoutubeVideo>`
    SELECT 
      video_id,
      title, 
      published_at, 
      thumbnail_url, 
      channel_id, 
      duration,
      left(transcript, 255) as transcript,
      market_sentiment
    FROM youtube_videos
    WHERE video_id = ${videoId};`;
  if (rows.length > 0) return rows[0];
  return null;
}

export async function saveYoutubeVideo(video: YoutubeVideo) {
  noStore();
  sql`
  INSERT INTO youtube_videos 
    (video_id, title, published_at, thumbnail_url,channel_id, duration)
  VALUES (
    ${video.video_id}, ${video.title}, ${video.published_at}, ${video.thumbnail_url}, 
    ${video.channel_id}, ${video.duration})
  ON CONFLICT (video_id) DO NOTHING
`;
}

export async function fetchYoutubeVideo(videoId: string) {
  noStore();
  const videoFromDB = await fetchYoutubeVideosFromDB(videoId);
  if (videoFromDB != null) {
    return videoFromDB;
  }

  const video = await fetchYoutubeVideoFromAPI(videoId);
  return video;
}


export async function fetchAllVideos(offset: number = 0, limit: number = 10) {
  noStore();
  const { rows } = await sql<{ video_id: string }>`
    SELECT 
      video_id 
    FROM youtube_videos 
    LIMIT ${limit}
    OFFSET ${offset}`
  return rows
}

export async function searchYoutubeVideos(query: string) {
  const apiKey = YOUTUBE_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=id&type=video&order=date&q=${query}`
  );
  const data: { items: { id: { videoId: string } }[] } = await response.json();
  return data.items.map(item => item.id.videoId);
}

async function fetchTranscript(videoId: string, startTime: number = 0, endTime: number = 0) {
  const transcriptRaw = await YoutubeTranscript.fetchTranscript(videoId);
  const transcript = transcriptRaw
    .filter(item => startTime < item.offset && item.offset < endTime)
    .map((item) => item.text).join(" ");
  return transcript;
}


async function getSentimentFromApi(
  transcript: string,
  prompt: string,
  openai: OpenAI,
  model: string = "gpt-3.5-turbo-16k"
) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
    model
  });

  const sentiment = chatCompletion.choices[0].message.content as Sentiment;
  return sentiment;
}

async function saveSentiment(videoId: string, sentiment: Sentiment) {
  noStore();
  await sql`UPDATE youtube_videos set market_sentiment = ${sentiment} where video_id = ${videoId};`;
}

export async function getSentiment(videoId: string) {
  const openAiClient = new OpenAI({ apiKey: OPENAI_API_KEY });
  const transcript = await fetchTranscript(videoId, 10 * 1000, 610 * 1000);
  const sentiment = await getSentimentFromApi(transcript, PROMPT, openAiClient);
  await saveSentiment(videoId, sentiment);
  revalidatePath('/videos');
  return sentiment;
}
