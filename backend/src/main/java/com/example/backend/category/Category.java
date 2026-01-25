package com.example.backend.category;


import com.example.backend.drink.Drink;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    // use name = ... when the variable name is different from the column name
    // in this case: display_order == displayOrder
    @Column(name = "display_order")
    private Integer displayOrder = 0;

    // optional (bidirectional)
    @OneToMany(mappedBy = "category")
    private List<Drink> drinks = new ArrayList<>();

    public String getName() {
        return name;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public List<Drink> getDrinks() {
        return drinks;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public void setDrinks(List<Drink> drinks) {
        this.drinks = drinks;
    }

    public Integer getId() {
        return id;
    }
}
