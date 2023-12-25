import { TiWeatherSunny, TiWeatherDownpour, TiWeatherPartlySunny } from "react-icons/ti";

export const WeatherIcon = ({ sentiment }: { sentiment: "bullish" | "neutral" | "bearish" }) => {
    switch (sentiment) {
        case "bullish":
            return <TiWeatherSunny className="mr-1" />
        case "neutral":
            return <TiWeatherPartlySunny className="mr-1" />
        case "bearish":
            return <TiWeatherDownpour className="mr-1" />
    }
}
