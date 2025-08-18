import type { BaseResponse } from "@/types/apiBaseResponse";

type Conversation = {
    id: string;
    title: string;
    avatar_url: string;
    is_group: boolean;
    is_community: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    creator: string;
}

type ResponseList = BaseResponse<{
    pages_count: number;
    current_page: number;
    page_content: Conversation[];
} | null>;

type ResponseOne = BaseResponse<Conversation>;

export type { Conversation, ResponseList, ResponseOne };