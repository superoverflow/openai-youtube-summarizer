import { TiWeatherSunny, TiWeatherDownpour, TiWeatherPartlySunny } from "react-icons/ti";
import { FcBullish, FcBearish, FcNeutralTrading } from "react-icons/fc";
import { VscQuestion } from "react-icons/vsc";

export const SentimentIcon = ({ sentiment }: { sentiment?: "Bullish" | "Neutral" | "Bearish" | null}) => {
    switch (sentiment) {
        case "Bullish":
            return <FcBullish className="mr-1" />
        case "Neutral":
            return <FcNeutralTrading className="mr-1" />
        case "Bearish":
            return <FcBearish className="mr-1" />
        default:
            return <VscQuestion className="mr-1" />
    }
}
