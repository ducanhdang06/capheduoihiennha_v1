package com.example.backend.drink;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Integer> {

    @Query("SELECT d FROM Drink d WHERE d.active = true")
    List<Drink> findAllActive();

    boolean existsByNameIgnoreCase(String name);

}
