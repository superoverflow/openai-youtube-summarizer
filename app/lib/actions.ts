"use server";

import { redirect } from "next/navigation";

export async function updateUrl(formData: FormData) {
  const videoIdInput = formData.get('videoIdInput');
  redirect(`/?videoId=${videoIdInput}`);
}
