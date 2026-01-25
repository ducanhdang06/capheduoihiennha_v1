package com.example.backend.drink;


// this is and input DTO - input from client to the server
// this abstract away the internal structure of our database

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public class DrinkRequest {

    @NotBlank
    private String name;
    private String description;

    @Positive
    private Integer price;
    @NotNull
    private Integer categoryId;

    private List<String> tags;
    private List<String> images;

    // getters & setters
    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }


    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Integer getPrice() {
        return price;
    }

    public List<String> getTags() {
        return tags;
    }

    public List<String> getImages() {
        return images;
    }

    public Integer getCategoryId() {
        return categoryId;
    }
}
