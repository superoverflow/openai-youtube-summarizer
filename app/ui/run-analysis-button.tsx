"use client"

import { PiCheckFatFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { processVideo } from "@/app/lib/actions";
import { IoMdHourglass } from "react-icons/io";

import { useTransition, useState } from 'react';

export const RunAnalysisButton = ({ videoId, processed }: { videoId: string, processed: boolean }) => {
  const [_, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const disabled = sent || processed;
  return (
    <Button className="w-full" variant="outline"
      onClick={() => startTransition(() => {
        setSent(true)
        processVideo(videoId)
      }
      )}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {
        sent ? <IoMdHourglass className="mr-2 h-4 w-4 animate-spin" /> :
          <PiCheckFatFill className="mr-2 h-4 w-4" />

      }
      <span>{processed ? "Processed" : sent ? "Analyzing" : "Run Analysis"}</span>
    </Button>
  )
}