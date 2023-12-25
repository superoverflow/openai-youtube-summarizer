type Sentiment = "Bullish" | "Neutral" | "Bearish" | null;

export type YoutubeVideoAPIResponse = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: {
            url: string;
            width: number;
            height: number;
        };
        medium: {
            url: string;
            width: number;
            height: number;
        };
        high: {
            url: string;
            width: number;
            height: number;
        };
    };
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
        title: string;
        description: string;
    };
    defaultAudioLanguage: string;
}

export type YoutubeVideo = {
    video_id: string;
    title: string;
    published_at: string;
    thumbnail_url: string;
    channel_id: string;
    transcript?: string;
    market_sentiment?: Sentiment;
}

export type SentimentResponse = {
    market_sentiment: Sentiment;
    single_names: {
        name: string;
        sentiment: Sentiment;
    }[];
}

export type Message = {
    videoId: string;
}