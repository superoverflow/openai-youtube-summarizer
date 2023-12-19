import OpenAI from "openai";

import { NextRequest } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

async function getVideo(videoId: string) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
  );
  const data = await response.json();

  const video = data.items[0].snippet;
  return {
    publishedAt: video.publishedAt,
    title: video.title,
    image: video.thumbnails.high.url,
  };
}

async function getTranscript(videoId: string) {
  const transcriptRaw = await YoutubeTranscript.fetchTranscript(videoId);
  const transcript = transcriptRaw.map((item) => item.text).join(" ");
  return transcript;
}

async function getSentiment(transcript: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You analyze speech and summarize in json format:
              {
                  "market_sentiment": "<Bullish/Neutral/Bearish>",
                  "single_names": [
                      {
                          "name": "<name>",
                          "sentiment": "<bullish/bearish>"
                      },
                      ...
                  ]
              }`,
      },
      {
        role: "user",
        content: transcript,
      },
    ],
    model: "gpt-3.5-turbo-16k",
  });

  const sentiment = JSON.parse(
    chatCompletion.choices[0].message.content || "{}"
  );
  return sentiment;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  if (!videoId) {
    return new Response("No videoId provided", {
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    });
  }

  const video = await getVideo(videoId);
  const transcript = await getTranscript(videoId);
  const sentiment = await getSentiment(transcript);
  const body = JSON.stringify({ video, transcript, sentiment });
  return new Response(body, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
