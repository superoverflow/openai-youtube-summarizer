import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export const YoutubeCardSkeleton = () => {
  return (
    <Card className="w-[320px] h-[180px] m-1">
      <CardHeader>
        <CardDescription>
          <Skeleton className="w-full h-8" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <Skeleton
            className="rounded-md w-[180px] h-[72px]" />
          <div className="flex flex-col w-full mx-2">
            <div className="mt-1 text-sm text-gray-500 flex items-center">
              <Skeleton className="w-full h-8"/>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <Skeleton className="w-full h-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}