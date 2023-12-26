import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="container flex mx-auto h-screen w-full justify-center align-middle">
      <AiOutlineLoading className="animate-spin h-12 w-12 mt-4" />
    </div>
  )
}