import { FcBullish, FcBearish, FcNeutralTrading } from "react-icons/fc";
import { VscQuestion } from "react-icons/vsc";

const SentimentIcon = ({ sentiment }: { sentiment?: "Bullish" | "Neutral" | "Bearish"}) => {
    const className = "mr-1 w-6 h-6"

    switch (sentiment) {
        case "Bullish":
            return <FcBullish className={className} />
        case "Neutral":
            return <FcNeutralTrading className={className} />
        case "Bearish":
            return <FcBearish className={className} />
        default:
            return <VscQuestion className={className} />
    }
}

export const SentimentIconContainer = ({ sentiment }: { sentiment?: "Bullish" | "Neutral" | "Bearish"}) => {
    return (
        <div className="rounded-sm w-full flex flex-row justify-center align-middle">
            <SentimentIcon sentiment={sentiment} />
            <span className="mt-1">{sentiment}</span>
        </div>
    )
}
