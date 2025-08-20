import { baseApi } from "@/services/baseApi";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/apiAuth";

const handleLogin = async ({ email, password, username }: LoginRequest) => {
    if ((email || username) && password) {
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
    if (!refreshToken) return null;
    return await baseApi.post<LoginResponse>("/restock-token", { token: refreshToken });
}

const handleSignUp = async ({ username, nickname, email, password, birth }: RegisterRequest) => {
    if (!username || !nickname || !email || !password || !birth) return null;
    return await baseApi.post<RegisterResponse>("/registry", { username, nickname, email, password, birth });
}

export { handleLogin, validateToken, restockToken, handleSignUp };