import type { ApiResponse, Task } from "@/types/task";
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const TaskService = {
    getAll: async (): Promise<Task[]> => {
        const response = await apiClient.get<ApiResponse<Task[]>>('/api/tasks');
        return response.data.data;
    }
};