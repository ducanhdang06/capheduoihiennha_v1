package com.example.backend.image;

import com.example.backend.drink.Drink;
import jakarta.persistence.*;

@Entity
@Table(name = "drink_images")
public class DrinkImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drink_id", nullable = false)
    private Drink drink;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary = false;

    public void setDrink(Drink drink) {
        this.drink = drink;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setPrimary(boolean primary) {
        isPrimary = primary;
    }

    public Integer getId() {
        return id;
    }

    public Drink getDrink() {
        return drink;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isPrimary() {
        return isPrimary;
    }
}
