package com.example.backend.drink;

import com.example.backend.dto.AdminDrinkDetailResponse;
import com.example.backend.dto.AdminDrinkListResponse;
import com.example.backend.dto.AdminDrinkRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/drinks")
public class AdminDrinkController {

    private final DrinkService drinkService;

    public AdminDrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @GetMapping
    public List<AdminDrinkListResponse> getAll() {
        return drinkService.getAllForAdmin();
    }

    @PostMapping
    public AdminDrinkDetailResponse create(@RequestBody AdminDrinkRequest request) {
        return drinkService.createDrink(request);
    }

    @PutMapping("/{id}")
    public AdminDrinkDetailResponse update(
            @PathVariable Integer id,
            @RequestBody AdminDrinkRequest request
    ) {
        return drinkService.updateDrink(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        drinkService.softDelete(id);
    }

    @DeleteMapping("/{id}/hard")
    public void hardDelete(@PathVariable Integer id) {
        drinkService.hardDelete(id);
    }
}

