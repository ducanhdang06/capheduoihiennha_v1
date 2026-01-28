package com.example.backend.auth;

import jakarta.validation.constraints.NotBlank;

// USE: this is a dto for request from client
public class LoginRequest {
    @NotBlank(message = "Username is required")
    public String username;

    @NotBlank(message = "Password is required")
    public String password;
}
