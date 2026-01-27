package com.example.backend.drink;

import com.example.backend.dto.DrinkResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/drinks")
public class AdminDrinkController {

    private final DrinkService drinkService;

    public AdminDrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @GetMapping
    public List<DrinkResponse> searchDrinks(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String tag
    ) {
        return drinkService.searchDrinks(name, categoryId, tag);
    }
}
