package com.example.backend.drink;

import com.example.backend.dto.DrinkRequest;
import com.example.backend.dto.DrinkResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/drinks")
public class DrinkController {

    private final DrinkService drinkService;

    public DrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    // -------------------- PUBLIC --------------------

    @GetMapping
    public List<DrinkResponse> getAllDrinks(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String tag
    ) {
        return drinkService.getAllDrinks(categoryId, tag);
    }

    @GetMapping("/{id}")
    public DrinkResponse getDrinkById(@PathVariable Integer id) {
        try {
            return drinkService.getDrinkById(id);
        } catch (Exception e) {
            // This will print the error in your console
            e.printStackTrace();
            throw e;
        }
    }

    // -------------------- ADMIN --------------------

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DrinkResponse createDrink(
            @Valid @RequestBody DrinkRequest request
    ) {
        return drinkService.createDrink(request);
    }

    @PutMapping("/{id}")
    public DrinkResponse updateDrink(
            @PathVariable Integer id,
            @Valid @RequestBody DrinkRequest request
    ) {
        return drinkService.updateDrink(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDrink(@PathVariable Integer id) {
        drinkService.deleteDrink(id);
    }


}
