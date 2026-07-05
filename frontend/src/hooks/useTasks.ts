import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '@/services/task-service';
import type { Task } from '@/types/task';

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
