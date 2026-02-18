package com.example.backend.dto;

public record PublicDrinkResponse(
         Integer id,
         String name,
         String description,
         Integer price,
         String imageUrl,
         String categoryName
) {
}
