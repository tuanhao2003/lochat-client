import type { BaseResponse } from "@/types/apiBaseResponse";
import type { User } from "@/types/apiUsers";

type LoginRequest = {
    username?: string;
    email?: string;
    password: string;
};

type RegisterRequest = {
    username: string;
    nickname: string;
    email: string;
    password: string;
    birth: string;
}

type RestockRequest = {
    token: string;
}

type TokensResponse = BaseResponse<{
    access_token: string;
    refresh_token: string;
} | null>;

type RegisterResponse = BaseResponse<User | null>;

export type { LoginRequest, RegisterRequest, RestockRequest, TokensResponse, RegisterResponse, };