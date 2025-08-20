import { baseApi } from "@/services/baseApi";
import type { ResponseOne } from "@/types/apiUsers";

const getUserByID = async (id: string) => {
    return await baseApi.post<ResponseOne>("/user/find-by-id", {account_id: id});
}

export { getUserByID };