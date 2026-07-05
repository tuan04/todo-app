import { useQuery } from '@tanstack/react-query';
import { TaskService } from '@/services/task-service';
import type { Task } from '@/types/task';

export function useTasks() {
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: TaskService.getAll,
  });
}
