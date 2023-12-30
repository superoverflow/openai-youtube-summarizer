"use server";

import { redirect } from "next/navigation";
import Pusher from "pusher";
import { saveYoutubeVideo, getSentiment } from "@/app/lib/data";
import type { Message, YoutubeVideo } from "@/app/lib/definitions";

export async function searchVideos(formData: FormData) {
  const search = formData.get("search") as string;
  if (!search) return;
  redirect(`/?q=${search}`);
}

export async function processVideo(video: YoutubeVideo) {
  await saveYoutubeVideo(video);
  getSentiment(video.video_id);
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || "",
    key: process.env.PUSHER_KEY || "",
    secret: process.env.PUSHER_SECRET || "",
    cluster: process.env.PUSHER_CLUSTER || "",
    useTLS: true
  });
  const message: Message = { videoId: video.video_id };
  pusher.trigger("my-channel", "my-event", message);
  console.log(`==== sent videoId ${video.video_id}`);
}