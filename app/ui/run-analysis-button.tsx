"use client"

import { PiCheckFatFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { processVideo } from "@/app/lib/actions";

export const RunAnalysisButton = ({ videoId }: { videoId: string }) => {
    const processVideoId = processVideo.bind(null, videoId)
    return (
        <form action={processVideoId} >
            <Button className="w-full" variant="outline">
                <PiCheckFatFill className="mr-2 h-4 w-4" />Run Analysis
            </Button>
        </form>
    )
}