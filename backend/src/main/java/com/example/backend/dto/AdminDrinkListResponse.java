package com.example.backend.dto;

import java.time.LocalDateTime;

public record AdminDrinkListResponse(
        Integer id,
        String name,
        String categoryName,
        Integer price,
        Boolean active,
        LocalDateTime updatedAt
) { }
