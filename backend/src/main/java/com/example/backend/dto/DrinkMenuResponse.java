package com.example.backend.dto;

import com.example.backend.drink.Drink;

public record DrinkMenuResponse(
        Integer id,
        String name,
        Integer price,
        String imageUrl
) {
    public DrinkMenuResponse(Drink drink) {
        this(
                drink.getId(),
                drink.getName(),
                drink.getPrice(),
                drink.getImages().isEmpty()
                        ? null
                        : drink.getImages().getFirst().getImageUrl()
        );
    }
}

