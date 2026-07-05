import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '@/services/task-service';
import type { Page, Task, TaskStatus } from '@/types/task';

export function useTasks(page = 0, size = 10, keyword?: string, status?: TaskStatus | 'ALL') {
  return useQuery<Page<Task>, Error>({
    queryKey: ['tasks', { page, size, keyword, status }],
    queryFn: () => TaskService.getAll(page, size, keyword, status),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, taskData }: { id: string; taskData: { title: string; description?: string; taskStatus: TaskStatus } }) =>
      TaskService.update(id, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
