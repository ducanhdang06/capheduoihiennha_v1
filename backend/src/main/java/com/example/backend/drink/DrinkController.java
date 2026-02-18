package com.example.backend.drink;

import com.example.backend.dto.CategoryMenuResponse;
import com.example.backend.dto.PublicDrinkResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drinks")
public class DrinkController {

    private final DrinkService drinkService;

    public DrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @GetMapping
    public List<CategoryMenuResponse> getPublicMenu() {
        return drinkService.getPublicMenu();
    }

    @GetMapping("/{id}")
    public PublicDrinkResponse getDrink(@PathVariable Integer id) {
        return drinkService.getPublicDrink(id);
    }
}
