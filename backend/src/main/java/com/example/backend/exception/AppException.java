package com.example.backend.exception;

import org.springframework.http.HttpStatus;

// USE: base class for all custom exceptions
// abstract class: cannot be initialized by itself
// must be inherited by other class
public abstract class AppException extends RuntimeException {
    private final HttpStatus status;
    private final String code;

    protected AppException(String message, HttpStatus status, String code) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }
}
