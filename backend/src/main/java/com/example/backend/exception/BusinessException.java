package com.example.backend.exception;

import org.springframework.http.HttpStatus;

// USE: for duplicate drink, invalid state and rule violations
public class BusinessException extends AppException {
    public BusinessException(String message, String code) {
        super(message, HttpStatus.CONFLICT, code);
    }
}
