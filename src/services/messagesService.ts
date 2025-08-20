import { baseApi } from "@/services/baseApi";
import type { ResponseOne } from "@/types/apiMessages";

const getLastMessageInConversation = async (conversation_id: string) => {
    return await baseApi.post<ResponseOne>("/message/get-last-message", {conversation_id: conversation_id});
}

export { getLastMessageInConversation };