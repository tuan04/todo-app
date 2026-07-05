package com.htuan04.todo_app.utils;

import com.htuan04.todo_app.dtos.TaskResponseDTO;
import com.htuan04.todo_app.entities.Task;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskResponseDTO toResponse (Task task);

    List<TaskResponseDTO> toListResponse (List<Task> tasks);
}
