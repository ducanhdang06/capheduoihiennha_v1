package com.example.backend.category;

import com.example.backend.dto.AdminCategoryRequest;
import com.example.backend.dto.AdminCategoryResponse;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ErrorCodes;
import com.example.backend.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // GET all
    public List<AdminCategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(category ->
                        new AdminCategoryResponse(
                                category.getId(),
                                category.getName()
                        )
                )
                .toList();
    }

    // CREATE
    public AdminCategoryResponse createCategory(AdminCategoryRequest request) {

        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new BusinessException(
                    "Category already exists",
                    ErrorCodes.CATEGORY_DUPLICATE
            );
        }

        Category category = new Category();
        category.setName(request.getName());

        Category saved = categoryRepository.save(category);

        return new AdminCategoryResponse(
                saved.getId(),
                saved.getName()
        );
    }

    // DELETE (hard delete)
    public void deleteCategory(Integer id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Category not found",
                                ErrorCodes.CATEGORY_NOT_FOUND
                        )
                );

        categoryRepository.delete(category);
    }
}
