import { BaseApi, SetToken } from "@/services/baseApi";
import type { LoginRequest } from "@/types/apiAuth";
import type { LoginResponse } from "@/types/apiAuth";

const DoLogin = async ({ email, password, username }: LoginRequest) => {
    if (email || username) {
        return await BaseApi.post<LoginResponse>("/login", { email, password, username });
    }
    else {
        return null;
    }
}

const DoValidateToken = async (token: string) => {
    if (!token) {
        return null;
    }
    SetToken(token);
    return await BaseApi.post<LoginResponse>("/validate-token");
}

const DoRestockToken = async (refreshToken: string) => {
    if (!refreshToken) {
        return null;
    }
    return await BaseApi.post<LoginResponse>("/restock-token", { token: refreshToken });
}

export { DoLogin, DoValidateToken, DoRestockToken };