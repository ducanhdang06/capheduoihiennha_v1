package com.example.backend.category;

import com.example.backend.dto.AdminCategoryRequest;
import com.example.backend.dto.AdminCategoryResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    private final CategoryService categoryService;

    public AdminCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<AdminCategoryResponse> getAll() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public AdminCategoryResponse create(
            @RequestBody @Valid AdminCategoryRequest request
    ) {
        return categoryService.createCategory(request);
    }

    /**
     * Renames an existing category by ID.
     *
     * @param id      the ID of the category to rename
     * @param request the new name wrapped in an AdminCategoryRequest
     * @return the updated category
     */
    @PatchMapping("/{id}")
    public AdminCategoryResponse rename(
            @PathVariable Integer id,
            @RequestBody @Valid AdminCategoryRequest request
    ) {
        return categoryService.renameCategory(id, request.getName());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
    }
}
