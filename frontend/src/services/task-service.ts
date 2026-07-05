import type { ApiResponse, Page, Task, TaskStatus } from "@/types/task";
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const TaskService = {
    getAll: async (page = 0, size = 10, keyword?: string, status?: TaskStatus | 'ALL'): Promise<Page<Task>> => {
        const params: Record<string, any> = { page, size };
        if (keyword) params.keyword = keyword;
        if (status && status !== 'ALL') params.status = status;

        const response = await apiClient.get<ApiResponse<Page<Task>>>('/api/tasks', { params });
        return response.data.data;
    },
    create: async (taskData: { title: string; description?: string }): Promise<Task> => {
        const response = await apiClient.post<ApiResponse<Task>>('/api/tasks', taskData);
        return response.data.data;
    },
    update: async (id: string, taskData: { title: string; description?: string; taskStatus: TaskStatus }): Promise<Task> => {
        const response = await apiClient.put<ApiResponse<Task>>(`/api/tasks/${id}`, taskData);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete<ApiResponse<null>>(`/api/tasks/${id}`);
    }
};