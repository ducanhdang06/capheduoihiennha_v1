package com.example.backend.dto;

import java.time.LocalDateTime;

public record AdminDrinkListDTO(
        Integer id,
        String name,
        Integer price,
        String categoryName,
        boolean active,
        LocalDateTime updatedAt
) {}

