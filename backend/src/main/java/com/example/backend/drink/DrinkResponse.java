package com.example.backend.drink;

import java.util.List;

// this is a dto - what the server sends back to the client
public class DrinkResponse {
    private Integer id;
    private String name;
    private String description;
    private Integer price;

    private String category;      // "Coffee"
    private List<String> tags;    // ["hot", "popular"]
    private List<String> images;  // ["latte1.jpg"]

    // getters & setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Integer getId() {
        return id;
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

    public String getCategory() {
        return category;
    }

    public List<String> getTags() {
        return tags;
    }

    public List<String> getImages() {
        return images;
    }
}
