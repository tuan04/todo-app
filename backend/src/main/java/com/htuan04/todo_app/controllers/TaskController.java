package com.htuan04.todo_app.controllers;

import com.htuan04.todo_app.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor

public class TaskController {
    private final TaskService taskService;

}
