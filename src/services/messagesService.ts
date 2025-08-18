import { baseApi, setToken } from "@/services/baseApi";
import type { ResponseOne } from "@/types/apiMessages";

const getLastMessageInConversation = async (token: string, conversation_id: string) => {
    if (token) {
        setToken(token);
        return await baseApi.post<ResponseOne>("/message/get-last-message", {conversation_id: conversation_id});
    } else {
        return null;
    }
}

export { getLastMessageInConversation };