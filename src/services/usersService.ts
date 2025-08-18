import { baseApi, setToken } from "@/services/baseApi";
import type { ResponseOne } from "@/types/apiUsers";

const getUserByID = async (token: string, id: string) => {
    if (token) {
        setToken(token);
        return await baseApi.post<ResponseOne>("/user/find-by-id", {account_id: id});
    } else {
        return null;
    }
}

export { getUserByID };