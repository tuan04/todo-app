import type { ApiResponse, Task, TaskStatus } from "@/types/task";
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const TaskService = {
    getAll: async (): Promise<Task[]> => {
        console.log("GET ALL");
        const response = await apiClient.get<ApiResponse<Task[]>>('/api/tasks');
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