import Pusher from "pusher-js";
import pg from "pg";
import { YoutubeTranscript } from "youtube-transcript";
import { config } from "dotenv";
import type { Sentiment, Message } from "@/app/lib/definitions";
import OpenAI from "openai";

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

config();

const { Pool: PgPool } = pg;
const envVar = (envName: string) => {
  const envValue = process.env[envName];
  if (!envValue) {
    throw new Error(`Environment variable ${envName} is not set`);
  }
  return envValue;
};

const OPENAI_API_KEY = envVar("OPENAI_API_KEY");
const PUSHER_KEY = envVar("PUSHER_KEY");
const PUSHER_CLUSTER = envVar("PUSHER_CLUSTER");
const PUSHER_CHANNEL = envVar("PUSHER_CHANNEL");
const PUSHER_EVENT = envVar("PUSHER_EVENT");
const POSTGRES_URL = envVar("POSTGRES_URL");

const openAiClient = new OpenAI({ apiKey: OPENAI_API_KEY });
const pgPool = new PgPool({
  connectionString: POSTGRES_URL + "?sslmode=require",
});

const messageHandler = async (message: Message) => {
  const { videoId } = message;
  console.log(`==== received videoId ${videoId}`);
  const transcript = await fetchTranscript(videoId);
  const sentiment = await getSentiment(transcript, PROMPT, openAiClient);
  saveSentiment(videoId, pgPool, sentiment);
  console.log(`==== saved sentiment for videoId ${videoId}`);
};

async function fetchTranscript(videoId: string) {
  const transcriptRaw = await YoutubeTranscript.fetchTranscript(videoId);
  const transcript = transcriptRaw.map((item) => item.text).join(" ");
  return transcript;
}

async function getSentiment(
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

  const sentiment: Sentiment = JSON.parse(
    chatCompletion.choices[0].message.content || "{}"
  );
  return sentiment;
}

async function saveSentiment(videoId: string, pgPool: pg.Pool, sentiment: Sentiment) {
  const result = await pgPool.query(
    "UPDATE youtube_videos set market_sentiment = $2 where video_id = $1",
    [videoId, sentiment.market_sentiment]
  );
  console.log({ result });
  pgPool.end();
}

const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
});
const channel = pusher.subscribe(PUSHER_CHANNEL);
console.log(`==== subscribed to ${PUSHER_CHANNEL}`);
channel.bind(PUSHER_EVENT, messageHandler);