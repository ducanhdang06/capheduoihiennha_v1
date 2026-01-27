package com.example.backend.exception;

// USE: central place for error identifiers used by frontend
public final class ErrorCodes {
    private ErrorCodes() {}

    public static final String DRINK_NOT_FOUND = "DRINK_NOT_FOUND";
    public static final String DRINK_DUPLICATE = "DRINK_DUPLICATE";
    public static final String INVALID_INPUT = "INVALID_INPUT";
    public static final String CATEGORY_NOT_FOUND = "CATEGORY_NOT_FOUND";
    public static final String DRINK_ALREADY_INACTIVE = "DRINK_ALREADY_INACTIVE";
}
