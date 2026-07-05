package com.htuan04.todo_app.controllers;

import com.htuan04.todo_app.dtos.ApiResponse;
import com.htuan04.todo_app.dtos.TaskResponseDTO;
import com.htuan04.todo_app.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor

public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getAllTask() {
        return ResponseEntity.ok(ApiResponse.success(taskService.getAllTasks()));
    }
}
