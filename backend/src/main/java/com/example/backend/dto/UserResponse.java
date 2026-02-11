package com.example.backend.dto;

public record UserResponse(
        Long id,
        String username,
        String role
) {}

