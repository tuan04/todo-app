package com.htuan04.todo_app.services;

import com.htuan04.todo_app.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class TaskService {
    private final TaskRepository taskRepository;

}
