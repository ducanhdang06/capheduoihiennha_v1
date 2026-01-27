package com.example.backend.exception;

import org.springframework.http.HttpStatus;

// USE: api down, external service timeouts
public class ExternalServiceException extends AppException{


    public ExternalServiceException(String message, String code) {
        super(message, HttpStatus.SERVICE_UNAVAILABLE, code);
    }
}
