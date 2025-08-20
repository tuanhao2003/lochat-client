import { baseApi } from "@/services/baseApi";
import type { LoginRequest } from "@/types/apiAuth";
import type { LoginResponse } from "@/types/apiAuth";

const handleLogin = async ({ email, password, username }: LoginRequest) => {
    if (email || username) {
        return await baseApi.post<LoginResponse>("/login", { email, password, username });
    }
    else {
        return null;
    }
}

const validateToken = async () => {
    return await baseApi.post<LoginResponse>("/validate-token");
}

const restockToken = async (refreshToken: string) => {
    if (!refreshToken) {
        return null;
    }
    return await baseApi.post<LoginResponse>("/restock-token", { token: refreshToken });
}

export { handleLogin, validateToken, restockToken };