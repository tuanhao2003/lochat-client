import { BaseApi, SetToken } from "@/services/baseApi";
import type { UserConversationsResponse } from "@/types/apiConversations";

const LoadAccountConversations = async (token: string) => {
    if (token) {
        SetToken(token);
        return await BaseApi.post<UserConversationsResponse>("/conversation/load-account-conversations");
    } else {
        return null;
    }
}

export { LoadAccountConversations };