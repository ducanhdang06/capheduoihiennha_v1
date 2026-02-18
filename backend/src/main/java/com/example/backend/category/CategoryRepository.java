package com.example.backend.category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    // check if a category exists with given name
    boolean existsByNameIgnoreCase(String name);

}
