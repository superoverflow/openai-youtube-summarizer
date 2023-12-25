"use client"

import { PiCheckFatFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { processVideo } from "@/app/lib/actions";

import { useTransition } from 'react';

export const RunAnalysisButton = ({ videoId }: { videoId: string }) => {
    let [isPending, startTransition] = useTransition();

    return (
        <Button className="w-full" variant="outline" 
            onClick={() => startTransition(() => processVideo(videoId))}
        >
            <PiCheckFatFill className="mr-2 h-4 w-4" />
            <span>{isPending ? "..." : "Run Analysis"}</span>
        </Button>
    )
}