import { YoutubeVideo } from "./definitions";
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";

import type { Sentiment } from "./definitions";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PROMPT = `You analyze speech and summarize in json format:
{
    "market_sentiment": "<Bullish/Neutral/Bearish>",
    "single_names": [
        {
            "name": "<name>",
            "sentiment": "<bullish/bearish>"
        },
        ...
    ]
}`;

async function fetchTranscript(videoId: string) {
  const transcriptRaw = await YoutubeTranscript.fetchTranscript(videoId);
  const transcript = transcriptRaw.map((item) => item.text).join(" ");
  return transcript;
}

async function getSentiment(transcript: string) {
  const apiKey = OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: PROMPT,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
    model: "gpt-3.5-turbo-16k",
  });

  const sentiment: Sentiment = JSON.parse(
    chatCompletion.choices[0].message.content || "{}"
  );
  return sentiment;
}

export async function fetchYoutubeVideo(videoId: string) {
  const apiKey = YOUTUBE_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
  );
  const data = await response.json();

  const video: YoutubeVideo = data.items[0].snippet;
  return video;
}

export async function fetchSentiment(videoId: string) {
  const transcript = await fetchTranscript(videoId);
  const sentiment = await getSentiment(transcript);
  return sentiment;
}