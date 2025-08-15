import {DoRestockToken} from "@/services/authService";

export async function tokenExpiredHandle() {
  const token = localStorage.getItem('refresh_token');
    if (!token) {
        window.location.href = '/login';
        return;
    }
    try {
        const response = await DoRestockToken(token);
        if (response && response.data) {
            if (response.data.data?.account === 'DEACTIVATED') {
                window.location.href = '/login';
                return;
            }
            if (response.data.data) {
                localStorage.setItem('access_token', response.data.data.access_token);
                localStorage.setItem('refresh_token', response.data.data.refresh_token);

                return response.data.data.access_token;
            }
        }
    } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    }
}