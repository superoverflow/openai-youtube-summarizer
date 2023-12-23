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
    market_sentiment?: string;
}

export type Sentiment = {
    market_sentiment: string;
    single_names: {
        name: string;
        sentiment: string;
    }[];
}

export type Message = {
    videoId: string;
}