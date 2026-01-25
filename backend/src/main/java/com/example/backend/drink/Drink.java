package com.example.backend.drink;

import com.example.backend.category.Category;
import com.example.backend.image.DrinkImage;
import com.example.backend.tag.Tag;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "drinks")
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // name cant be null
    @Column(nullable = false)
    private String name;

    private String description;

    // price cant be null
    @Column(nullable = false)
    private Integer price;

    // lazy fetch: when drink is loaded, the category will not be loaded immediately
    // this helps to improve performance, only load category when access in the code
    // joinColumn: when there is a many-to-one relationship (many drinks : 1 category)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // many to many: a drink can have many tags and a tag can have many drinks
    @ManyToMany
    @JoinTable ( // because it is a many to many relationship, we need to join table
            name = "drink_tags", // name of the immediate table
            // join" because it joins from the join table to the entity where this annotation is written
            joinColumns = @JoinColumn(name = "drink_id"), // FK of current entity
            // "inverse" because it's the opposite side of the relationship
            inverseJoinColumns = @JoinColumn(name = "tag_id") // FK of other entity
    )
    // uses a set because no duplicates allowed and fast look up
    private Set<Tag> tags = new HashSet<>();

    // one drink has many images
    // the images belong to the drink, if the drink updates, updates the images
    // if a image is removed from a drink, remove it out of the database
    // mappedBy = "drink: who owns the relationship --> variable drink in DrinkImage
    // cascade == CascadeType.ALL: whatever i do to the drink, do the same thing to the img
    // orphan removal: if an image is removed from the list, delete from the database
    @OneToMany(mappedBy = "drink", cascade = CascadeType.ALL, orphanRemoval = true)
    // use a list because order matters
    private List<DrinkImage> images = new ArrayList<>();

    // PrePersist: run when a new drink is added
    // timeline: java created object --> PrePersist runs --> INSERT INTO drinks
    @PrePersist
    void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    // PreUpdate: runs when an entity is updated
    // conditions: entity already exists in the db, changes at least one field and call save()
    // timeline: field changes in Java --> PreUpdate runs --> UPDATE
    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
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

    public Category getCategory() {
        return category;
    }

    public boolean isActive() {
        return active;
    }

    public List<DrinkImage> getImages() {
        return images;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void deactivate() {
        this.active = false;
    }

    public void activate() {
        this.active = true;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public void setImages(List<DrinkImage> images) {
        this.images = images;
    }
}
