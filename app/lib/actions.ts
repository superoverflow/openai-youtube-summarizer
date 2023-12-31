"use server";

import { redirect } from "next/navigation";
import { saveYoutubeVideo, getSentiment } from "@/app/lib/data";
import type { YoutubeVideo } from "@/app/lib/definitions";

export async function searchVideos(formData: FormData) {
  const search = formData.get("search") as string;
  if (!search) return;
  redirect(`/?q=${search}`);
}

export async function processVideo(video: YoutubeVideo) {
  await saveYoutubeVideo(video);
  return await getSentiment(video.video_id);
}