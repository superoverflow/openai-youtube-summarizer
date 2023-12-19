import { NextRequest } from "next/server";
import data from "@/app/api/dummy/sample.json";

export async function GET(request: NextRequest) {
  const body = JSON.stringify(data);
  return new Response(body, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
