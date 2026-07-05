package com.htuan04.todo_app.services;

import com.htuan04.todo_app.dtos.AddTaskDTO;
import com.htuan04.todo_app.dtos.EditTaskDTO;
import com.htuan04.todo_app.dtos.TaskResponseDTO;
import com.htuan04.todo_app.entities.Task;
import com.htuan04.todo_app.exceptions.BusinessException;
import com.htuan04.todo_app.exceptions.ErrorCode;
import com.htuan04.todo_app.repositories.TaskRepository;
import com.htuan04.todo_app.utils.TaskMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public List<TaskResponseDTO> getAllTasks() {
        return taskMapper.toListResponse(taskRepository.findAll());
    }

    @Transactional
    public TaskResponseDTO addNewTask(AddTaskDTO request) {
        Task task = taskRepository.save(taskMapper.toEntityForCreate(request));

        return taskMapper.toResponse(task);
    }

    public Task findById (UUID id){
        return taskRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND));
    }

    @Transactional
    public TaskResponseDTO editTask(UUID id, EditTaskDTO request) {
        Task task = this.findById(id);
        taskMapper.updateEntity(request, task);
        Task updatedTask = taskRepository.save(task);

        return taskMapper.toResponse(updatedTask);
    }

    @Transactional
    public void deleteTask(UUID id){
        taskRepository.deleteById(id);
    }
}
