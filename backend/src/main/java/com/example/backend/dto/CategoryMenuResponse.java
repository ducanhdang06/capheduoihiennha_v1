package com.example.backend.dto;

import com.example.backend.category.Category;

import java.util.List;

public record CategoryMenuResponse(
        Integer id,
        String name,
        List<DrinkMenuResponse> drinks
) {
    public CategoryMenuResponse(Category category) {
        this(
                category.getId(),
                category.getName(),
                category.getDrinks()
                        .stream()
                        .map(DrinkMenuResponse::new)
                        .toList()
        );
    }
}

