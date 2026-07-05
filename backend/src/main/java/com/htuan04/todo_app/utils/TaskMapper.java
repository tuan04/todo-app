package com.htuan04.todo_app.utils;

import com.htuan04.todo_app.dtos.AddTaskDTO;
import com.htuan04.todo_app.dtos.EditTaskDTO;
import com.htuan04.todo_app.dtos.TaskResponseDTO;
import com.htuan04.todo_app.entities.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskResponseDTO toResponse (Task task);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "taskStatus", ignore = true)
    Task toEntityForCreate (AddTaskDTO dto);

    void updateEntity(
            EditTaskDTO dto,
            @MappingTarget Task task
    );

    List<TaskResponseDTO> toListResponse (List<Task> tasks);
}
