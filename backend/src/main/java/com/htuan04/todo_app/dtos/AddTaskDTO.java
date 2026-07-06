package com.htuan04.todo_app.dtos;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter

public class AddTaskDTO {
    @NotBlank(message = "Vui lòng nhập tên công việc")
    @Length(max = 50, message = "Yêu cầu không vượt quá 50 ký tự")
    private String title;

    private String description;

    @Future(message = "Hạn chót phải ở trong tương lai")
    private LocalDateTime dueDate;
}
