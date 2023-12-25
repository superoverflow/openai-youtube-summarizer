import { TiWeatherSunny, TiWeatherDownpour, TiWeatherPartlySunny } from "react-icons/ti";
import { VscQuestion } from "react-icons/vsc";

export const WeatherIcon = ({ sentiment }: { sentiment?: "Bullish" | "Neutral" | "Bearish" | null}) => {
    switch (sentiment) {
        case "Bullish":
            return <TiWeatherSunny className="mr-1" />
        case "Neutral":
            return <TiWeatherPartlySunny className="mr-1" />
        case "Bearish":
            return <TiWeatherDownpour className="mr-1" />
        default:
            return <VscQuestion className="mr-1" />
    }
}
