package com.htuan04.todo_app.dtos;

import com.htuan04.todo_app.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter

public class EditTaskDTO {
    @NotBlank(message = "Vui lòng nhập tên công việc")
    @Length(max = 50, message = "Yêu cầu dưới 50 ký tự")
    private String title;

    private String description;

    @NotNull(message = "Vui lòng chọn trạng thái")
    private TaskStatus taskStatus;
}
