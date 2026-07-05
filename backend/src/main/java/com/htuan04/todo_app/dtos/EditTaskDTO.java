package com.htuan04.todo_app.dtos;

import com.htuan04.todo_app.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public class EditTaskDTO {
    @NotBlank(message = "Vui lòng nhập tên công việc")
    @Length(max = 50, message = "Yêu cầu dưới 50 ký tự")
    private String title;

    private String description;

    @NotNull(message = "Vui lòng chọn trạng thái")
    @Pattern(regexp = "PENDING|IN_PROGRESS|COMPLETED", message = "Trạng thái không hợp lệ")
    private TaskStatus taskStatus;
}
