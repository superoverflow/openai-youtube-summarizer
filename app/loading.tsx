import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="container flex mx-auto min-h-screen w-full justify-center items-center">
      <AiOutlineLoading className="animate-spin h-4 w-4" />
    </div>
  )
}