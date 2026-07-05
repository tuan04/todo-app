package com.htuan04.todo_app.dtos;

import com.htuan04.todo_app.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter

public class AddTaskDTO {
    @NotBlank(message = "Vui lòng nhập tên công việc")
    @Length(max = 50, message = "Yêu cầu không vượt quá 50 ký tự")
    private String title;

    private String description;
}
