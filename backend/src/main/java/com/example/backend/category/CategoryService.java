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

    /**
     * Renames an existing category.
     * Throws NotFoundException if the category does not exist.
     * Throws BusinessException if the new name is already taken (case-insensitive).
     *
     * @param id   the ID of the category to rename
     * @param name the new name to assign
     * @return the updated category as an AdminCategoryResponse
     */
    public AdminCategoryResponse renameCategory(Integer id, String name) {

        // Verify the category exists before attempting a rename
        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Category not found",
                                ErrorCodes.CATEGORY_NOT_FOUND
                        )
                );

        // Guard against collisions with an existing category name
        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new BusinessException(
                    "Category already exists",
                    ErrorCodes.CATEGORY_DUPLICATE
            );
        }

        category.setName(name);
        Category saved = categoryRepository.save(category);

        return new AdminCategoryResponse(saved.getId(), saved.getName());
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
