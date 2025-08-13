import type { BaseResponse } from "@/types/apiBaseResponse";

type User = {
    id: string;
    username: string;
    nickname: string;
    email: string;
    avatar_url: string;
    bio: string;
    birth: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

type SearchByEmailOrUsername = {
    search_data: string;
};

type GetAllUsers = {
    page?: number;
    page_size?: number;
};

type SearchRequest = SearchByEmailOrUsername | GetAllUsers;

type ResponseOne = BaseResponse<User | null>;

type ResponseList = BaseResponse<User[] | null>;

type SearchResponse = ResponseOne | ResponseList;

export type { User, SearchRequest, SearchResponse };