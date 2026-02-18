package com.example.backend.dto;

import java.time.LocalDateTime;


public record AdminDrinkDetailResponse(
         Integer id,
         String name,
         String description,
         Integer price,
         Integer categoryId,
         String imageUrl,
         Boolean active,
         LocalDateTime createdAt,
         LocalDateTime updatedAt
) { }
