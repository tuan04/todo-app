import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '@/services/task-service';
import type { Task, TaskStatus } from '@/types/task';

export function useTasks() {
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: TaskService.getAll,
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
