package com.example.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;


// USE: converts exceptions --> HTTP responses
// @RestControllerAdvice: Spring annotation used for global exception handling, apply to all controllers
@RestControllerAdvice
public class GlobalExceptionHandler {

    // whenever there is any exception that extends AppException is thrown
    // it extracts http status, frontend error code and human-readable message
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiError> handleAppException(AppException ex) {
        ApiError error = new ApiError(ex.getStatus().value(), ex.getCode(), ex.getMessage());
        return new ResponseEntity<>(error, ex.getStatus());
    }

    // when request body validation fails --> stop controllers from execution
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation (MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }


    // handle when everything else crashed and not handled above
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpected(Exception ex) {
        ApiError error = new ApiError (
                500,
                "INTERNAL_ERROR",
                "Unexpected server error"
        );
        return new ResponseEntity<>(error, HttpStatus. INTERNAL_SERVER_ERROR);
    }

}
