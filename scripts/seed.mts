import pg from "pg";
import { config } from "dotenv";
config();

const { Pool: PgPool } = pg;

const pgPool = new PgPool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

type Video = {
  video_id: string;
  title: string;
  published_at: string;
  thumbnail_url: string;
  transcript: string;
  market_sentiment: string;
};

const videos = [
  {
    video_id: "zLa6qdMAP6A",
    title:
      "Fed Blow Off Top, Semi's Trade Levels, Crypto Action, Gold, Silver & Stocks",
    published_at: "2021-06-17T22:00:00Z",
    thumbnail_url: "https://i.ytimg.com/vi/zLa6qdMAP6A/hqdefault.jpg",
    channel_id: "UCwTu6kD2igaLMpxswtcdxlg",
    transcript: "This is a transcript of the video",
    market_sentiment: "BULLISH",
  },
];

async function seedYoutubeVideos(pgPool: pg.Pool, videos: Video[]) {
  await pgPool.query(`
    CREATE TABLE IF NOT EXISTS youtube_videos (
        video_id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        published_at TIMESTAMP,
        thumbnail_url VARCHAR(255),
        channel_id VARCHAR(255),
        transcript TEXT,
        market_sentiment VARCHAR(255)
    )`);
  console.log("Created table youtube_videos");

  videos.map(async (video) => {
    await pgPool.query(`
    INSERT INTO youtube_videos (video_id, title, published_at, thumbnail_url, market_sentiment)
    VALUES (${video.video_id}, ${video.title}, ${video.published_at}, ${video.thumbnail_url}, ${video.market_sentiment})
    ON CONFLICT (id) DO NOTHING;
  `);
  });
  console.log(`Seeded youtube_videos`);
}

async function main() {
  await seedYoutubeVideos(pgPool, videos);
  await pgPool.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
