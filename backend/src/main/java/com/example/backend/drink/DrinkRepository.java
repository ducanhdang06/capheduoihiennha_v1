package com.example.backend.drink;

import com.example.backend.dto.AdminDrinkListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Integer> {

    @Query("SELECT d FROM Drink d WHERE d.active = true")
    List<Drink> findAllActive();

    boolean existsByNameIgnoreCase(String name);

    @Query("""
    SELECT new com.example.backend.dto.AdminDrinkListDTO(
        d.id,
        d.name,
        d.price,
        c.name,
        d.active,
        d.updatedAt
    )
    FROM Drink d
    JOIN d.category c
    ORDER BY d.updatedAt DESC
""")
    List<AdminDrinkListDTO> findAllForAdmin();

    @Query("""
    SELECT new com.example.backend.dto.AdminDrinkListDTO(
        d.id,
        d.name,
        d.price,
        c.name,
        d.active,
        d.updatedAt
    )
    FROM Drink d
    JOIN d.category c
    WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))
    ORDER BY d.updatedAt DESC
""")
    List<AdminDrinkListDTO> searchByName(@Param("name") String name);


    // find by active:
    @Query("""
    SELECT new com.example.backend.dto.AdminDrinkListDTO(
        d.id,
        d.name,
        d.price,
        c.name,
        d.active,
        d.updatedAt
    )
    FROM Drink d
    JOIN d.category c
    WHERE d.active = :active
    ORDER BY d.updatedAt DESC
""")
    List<AdminDrinkListDTO> findByActive(@Param("active") Boolean active);

    // find by name + active
    @Query("""
    SELECT new com.example.backend.dto.AdminDrinkListDTO(
        d.id,
        d.name,
        d.price,
        c.name,
        d.active,
        d.updatedAt
    )
    FROM Drink d
    JOIN d.category c
    WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))
      AND d.active = :active
    ORDER BY d.updatedAt DESC
""")
    List<AdminDrinkListDTO> searchByNameAndActive(
            @Param("name") String name,
            @Param("active") Boolean active
    );

}
