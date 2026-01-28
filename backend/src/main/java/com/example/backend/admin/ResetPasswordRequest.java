package com.example.backend.admin;

import jakarta.validation.constraints.NotBlank;

public class ResetPasswordRequest {

    @NotBlank
    public String newPassword;
}
