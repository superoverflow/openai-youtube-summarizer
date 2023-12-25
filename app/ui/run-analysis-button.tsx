"use client"

import { PiCheckFatFill } from "react-icons/pi";
import { VscReactions } from "react-icons/vsc";
import { IoMdHourglass } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { processVideo } from "@/app/lib/actions";


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
        processed ? 
          <PiCheckFatFill className="mr-2 h-4 w-4" />
        : sent ? 
          <IoMdHourglass className="mr-2 h-4 w-4 animate-spin" /> 
          : <VscReactions className="mr-2 h-4 w-4" />
          

      }
      <span>{processed ? "Processed" : sent ? "Analyzing" : "Run Analysis"}</span>
    </Button>
  )
}