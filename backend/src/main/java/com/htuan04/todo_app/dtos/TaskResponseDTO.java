package com.htuan04.todo_app.dtos;

import com.htuan04.todo_app.enums.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter

public class TaskResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private TaskStatus taskStatus;
    private LocalDateTime createdAt;
}
