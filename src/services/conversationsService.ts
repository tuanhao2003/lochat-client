import { baseApi } from "@/services/baseApi";
import type { ResponseList } from "@/types/apiConversations";

const getAccountConversations = async () => {
    return await baseApi.post<ResponseList>("/conversation/load-account-conversations");
}

export { getAccountConversations };