package com.htuan04.todo_app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor

public enum ErrorCode {
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "500", "An unexpected error occurred"),
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "400", "Invalid input data"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "Resource not found"),
    CONFLICT(HttpStatus.CONFLICT, "409", "Resource already exists");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
