"use client"

import { PiCheckFatFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { processVideo } from "@/app/lib/actions";
import { IoMdHourglass } from "react-icons/io";

import { useTransition, useState } from 'react';

export const RunAnalysisButton = ({ videoId }: { videoId: string }) => {
  const [_, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  return (
    <Button className="w-full" variant="outline"
      onClick={() => startTransition(() => {
        setSent(true)
        processVideo(videoId)
      }
      )}
      disabled={sent}
      aria-disabled={sent}
    >
      {
        sent ? <IoMdHourglass className="mr-2 h-4 w-4 animate-spin" /> :
          <PiCheckFatFill className="mr-2 h-4 w-4" />

      }
      <span>{sent ? "Analyzing" : "Run Analysis"}</span>
    </Button>
  )
}