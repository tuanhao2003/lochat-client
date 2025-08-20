type WsChatSendData = {
    type: string;
    content: string;
    reply_to?: string | null;
    name?: string | null;
    media_type?: string | null;
    size?: number | null;
    url?: string | null;
};

type WsChatReceiveData = {
    type: string;
    content: string;
    sender?: string | null;
    reply_to?: string | null;
    media_type?: string | null;
    media_name?: number | null;
    media_url?: string | null;
};

export type {WsChatSendData, WsChatReceiveData};