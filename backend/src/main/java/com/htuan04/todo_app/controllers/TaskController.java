package com.htuan04.todo_app.controllers;

import com.htuan04.todo_app.dtos.AddTaskDTO;
import com.htuan04.todo_app.dtos.ApiResponse;
import com.htuan04.todo_app.dtos.EditTaskDTO;
import com.htuan04.todo_app.dtos.TaskResponseDTO;
import com.htuan04.todo_app.services.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor

public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getAllTask() {
        return ResponseEntity.ok(ApiResponse.success(taskService.getAllTasks()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponseDTO>> addNewTask(@Valid @RequestBody AddTaskDTO request) {
        return ResponseEntity.ok(ApiResponse.success(taskService.addNewTask(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponseDTO>> editTask(@PathVariable UUID id, @Valid @RequestBody EditTaskDTO request) {
        return ResponseEntity.ok(ApiResponse.success(taskService.editTask(id,request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponseDTO>> deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);

        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
