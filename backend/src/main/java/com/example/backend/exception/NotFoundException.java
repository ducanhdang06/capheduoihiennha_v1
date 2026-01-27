package com.example.backend.exception;


import org.springframework.http.HttpStatus;

// USE: used for drink not found, category not found, user not found, etc
public class NotFoundException extends AppException {
    public NotFoundException(String message, String code) {
        super(message, HttpStatus.NOT_FOUND, code);
    }
}
