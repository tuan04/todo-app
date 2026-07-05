package com.htuan04.todo_app.services;

import com.htuan04.todo_app.dtos.TaskResponseDTO;
import com.htuan04.todo_app.repositories.TaskRepository;
import com.htuan04.todo_app.utils.TaskMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public List<TaskResponseDTO> getAllTasks() {
        return taskMapper.toListResponse(taskRepository.findAll());
    }
}
