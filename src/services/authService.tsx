import { BaseApi } from "@/services/baseApi";
import type { LoginRequest } from "@/types/apiAuth";
import type { TokensResponse } from "@/types/apiAuth";

const DoLogin = async ({ email, password, username }: LoginRequest) => {
    if (email || username) {
        return await BaseApi.post<TokensResponse>("/login", { email, password, username });
    }
    else {
        return null;
    }
}

export { DoLogin };