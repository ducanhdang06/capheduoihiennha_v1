package com.example.backend.exception;


import java.time.LocalDateTime;

// USE: standard error response format to clients
public class ApiError {

    private int status;
    private String code;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    public ApiError(int status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
