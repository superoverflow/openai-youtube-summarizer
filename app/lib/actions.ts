"use server";

import { redirect } from "next/navigation";
import Pusher from "pusher";
import type { Message } from "@/app/lib/definitions";

export async function updateUrl(formData: FormData) {
  const videoIdInput = formData.get("videoIdInput") as string;

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || "",
    key: process.env.PUSHER_KEY || "",
    secret: process.env.PUSHER_SECRET || "",
    cluster: process.env.PUSHER_CLUSTER || "",
    useTLS: true
  });

  const message: Message = { videoId: videoIdInput };
  pusher.trigger("my-channel", "my-event", message);
  redirect(`/?videoId=${videoIdInput}`);
}
