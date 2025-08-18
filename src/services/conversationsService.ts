import { baseApi, setToken } from "@/services/baseApi";
import type { UserConversationsResponse } from "@/types/apiConversations";

const getAccountConversations = async (token: string) => {
    if (token) {
        setToken(token);
        return await baseApi.post<UserConversationsResponse>("/conversation/load-account-conversations");
    } else {
        return null;
    }
}

export { getAccountConversations };