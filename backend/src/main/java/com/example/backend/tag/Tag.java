package com.example.backend.tag;

import com.example.backend.drink.Drink;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    // optional reverse mapping
    @ManyToMany(mappedBy = "tags")
    private Set<Drink> drinks = new HashSet<>();


    protected Tag() {

    }

    public Tag(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<Drink> getDrinks() {
        return drinks;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDrinks(Set<Drink> drinks) {
        this.drinks = drinks;
    }
}
