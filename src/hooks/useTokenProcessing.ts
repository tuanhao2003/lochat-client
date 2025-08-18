import type { AxiosResponse } from "axios";
import { setToken } from "@/services/baseApi";
import { useNavigate } from "react-router-dom";
import { restockToken } from "@/services/authService";
import { ACCOUNT_STATUS } from "@/constants/accountStatus";

const useTokenProcessing = () => {
    const navigate = useNavigate();

    const checkMessageResponse = async <T>(apiCall: () => Promise<AxiosResponse<T> | null>): Promise<T | undefined> => {
        try {
            const response = await apiCall();
            return response?.data;
        } catch (err: any) {
            if (err.response?.data?.message === "expired_token") {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    navigate("/login");
                    return;
                }
                const tokenResponse = await restockToken(refreshToken);
                let newToken;
                if (tokenResponse?.data.data) {
                    newToken = tokenResponse.data.data.access_token;
                    localStorage.setItem("access_token", newToken);
                    localStorage.setItem("refresh_token", tokenResponse.data.data.refresh_token);
                    localStorage.setItem("logged_in_user", JSON.stringify(tokenResponse.data.data.account));
                }
                if (newToken) setToken(newToken);

                const retryResponse = await apiCall();
                return retryResponse?.data;
            }
            else if (err.response?.data?.message === ACCOUNT_STATUS.DEACTIVATED) {
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("access_token");
                localStorage.removeItem("logged_in_user");
                navigate("/login");
                return;
            }
            else {
                throw err.response?.data;
            }
        }
    };

    return checkMessageResponse;
}

export default useTokenProcessing;