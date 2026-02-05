package com.example.backend.menu;

import com.example.backend.category.CategoryRepository;
import com.example.backend.dto.CategoryMenuResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private final CategoryRepository categoryRepository;

    public MenuService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryMenuResponse> getMenu() {
        return categoryRepository.findAllWithDrinks()
                .stream()
                .map(CategoryMenuResponse::new)
                .toList();
    }
}

