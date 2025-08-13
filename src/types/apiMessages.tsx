import type { BaseResponse } from "@/types/apiBaseResponse";

type Message = {
    id: string;
    index: number;
    type: string;
    content: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    conversation: string;
    sender_relation: string;
    media: string;
    reply_to: string;
}

type ConversationMessagesRequest = {
    conversation_id: string;
    page?: number;
    page_size?: number;
}

type ConversationMessagesResponse = BaseResponse<{
    pages_count: number;
    current_page: number;
    page_content: Message[];
} | null>;

export type { Message, ConversationMessagesRequest, ConversationMessagesResponse };