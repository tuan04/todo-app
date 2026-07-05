package com.htuan04.todo_app.dtos;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ErrorResponse {
    private boolean success;
    private String code;
    private String message;
    private Map<String, String> details; // For validation field errors

    public static ErrorResponse of(String code, String message) {
        return ErrorResponse.builder()
                .success(false)
                .code(code)
                .message(message)
                .build();
    }

    public static ErrorResponse of(String code, String message, Map<String, String> details) {
        return ErrorResponse.builder()
                .success(false)
                .code(code)
                .message(message)
                .details(details)
                .build();
    }
}
