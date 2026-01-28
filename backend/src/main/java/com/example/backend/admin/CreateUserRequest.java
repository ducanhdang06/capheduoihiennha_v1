package com.example.backend.admin;

import jakarta.validation.constraints.NotBlank;

public class CreateUserRequest {
    @NotBlank
    public String username;

    @NotBlank
    public String password;

}
