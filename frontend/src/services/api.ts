import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
    timeout: 7000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getErrorMessage = (error: any, defaultMsg: string): string => {
    if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
            return 'Máy chủ phản hồi quá chậm. Vui lòng thử lại sau!';
        }
        if (error.code === 'ERR_NETWORK') {
            return 'Máy chủ hiện tại không khả dụng hoặc đã tắt. Vui lòng kiểm tra lại!';
        }
        return error.response?.data?.message || defaultMsg;
    }
    return error?.message || defaultMsg;
};
