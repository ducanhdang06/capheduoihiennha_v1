package com.example.backend.drink;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DrinkRepository extends JpaRepository<Drink, Integer> {

    // find active drink + category in one query
    @Query("""
    SELECT d FROM Drink d
    JOIN FETCH d.category
    WHERE d.active = true
""")
    List<Drink> findActiveDrinksWithCategory();

    // find a drink detail with given id
    @Query("""
    SELECT d FROM Drink d
    JOIN FETCH d.category
    WHERE d.id = :id AND d.active = true
""")
    Optional<Drink> findActiveByIdWithCategory(@Param("id") Integer id);

    // find all drinks active + inactive with category
    @Query("""
    SELECT d FROM Drink d
    JOIN FETCH d.category
""")
    List<Drink> findAllWithCategory();


}
