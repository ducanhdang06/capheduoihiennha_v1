package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class AdminCategoryRequest {
    @NotBlank
    private String name;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
