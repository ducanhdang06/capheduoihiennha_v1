package com.example.backend.drink;

import com.example.backend.category.Category;
import com.example.backend.category.CategoryRepository;
import com.example.backend.dto.*;
import com.example.backend.exception.ErrorCodes;
import com.example.backend.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
// Transactional: keeps everything inside succeed / fail together
// keep the db session open while it runs
public class DrinkService {

    // need to have access to all tables to be able to create a drink
    private final DrinkRepository drinkRepository;
    private final CategoryRepository categoryRepository;

    public DrinkService(DrinkRepository drinkRepository, CategoryRepository categoryRepository) {
        this.drinkRepository = drinkRepository;
        this.categoryRepository = categoryRepository;
    }

    // ============================ PUBLIC =====================================

    /**
     * Builds the public menu grouped by category, including only active drinks
     * @return clean, frontend ready list of categories with list of drinks
     */
    public List<CategoryMenuResponse> getPublicMenu() {
        // fetch all categories from the database
        List<Category> categories = categoryRepository.findAll();
        // fetch all active drinks with their category
        List<Drink> drinks = drinkRepository.findActiveDrinksWithCategory();

        // create a map with key = categoryID and value = list of drink in that id
        Map<Integer, List<Drink>> drinksByCategory =
                drinks.stream()
                        .collect(Collectors.groupingBy(d -> d.getCategory().getId()));

        // prepare the return list
        List<CategoryMenuResponse> result = new ArrayList<>();

        // for each category, attach the drink
        for (Category category : categories) {
            List<PublicDrinkResponse> drinkDTOs =
                    drinksByCategory.getOrDefault(category.getId(), List.of())
                            .stream()
                            .map(this::mapToPublicDrinkResponse)
                            .toList();

            result.add(new CategoryMenuResponse(
                    category.getId(),
                    category.getName(),
                    drinkDTOs
            ));
        }

        // return result
        return result;

    }

    /**
     * Get a drink detail for public user
     * @param id drink id
     * @return the dto to send back
     */
    public PublicDrinkResponse getPublicDrink(Integer id) {
        Drink drink = drinkRepository
                .findActiveByIdWithCategory(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Drink not found",
                                ErrorCodes.DRINK_NOT_FOUND
                        ));

        return mapToPublicDrinkResponse(drink);
    }

    // ============================ ADMIN ======================================

    /**
     * Get all drinks for admin dashboard
     * @return list of admin drink dto
     */
    public List<AdminDrinkListResponse> getAllForAdmin() {
        List<Drink> drinks = drinkRepository.findAllWithCategory();

        return drinks.stream()
                .map(this::mapToAdminListResponse)
                .toList();
    }

    /**
     * Get the details for a specific drink
     * @param id drink id
     * @return a detail dto of the drink
     */
    public AdminDrinkDetailResponse getDrinkDetailForAdmin(Integer id) {
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Drink not found",
                                ErrorCodes.DRINK_NOT_FOUND
                        )
                );

        return mapToAdminDetailResponse(drink);
    }

    /**
     * Create a new drink
     * @param request dto receives from frontend
     * @return the dto of the successful created object
     */
    public AdminDrinkDetailResponse createDrink(AdminDrinkRequest request) {
        // find category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Category not found"
                        )
                );

        // create new Drink entity
        Drink drink = new Drink();
        drink.setName(request.getName());
        drink.setDescription(request.getDescription());
        drink.setPrice(request.getPrice());
        drink.setCategory(category);
        drink.setImageUrl(request.getImageUrl());

        // Optional: default active to true if null
        if (request.getActive() != null) {
            drink.setActive(request.getActive());
        }

        // save
        Drink saved = drinkRepository.save(drink);

        // map to response
        return mapToAdminDetailResponse(saved);
    }

    /**
     * Update the current drinks information
     * @param id id of the current drink
     * @param request dto from the frontend
     * @return the successful change drinks
     */
    public AdminDrinkDetailResponse updateDrink(Integer id, AdminDrinkRequest request) {
        // find existing drink
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Drink not found",
                                ErrorCodes.DRINK_NOT_FOUND
                        )
                );

        // validate category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Category not found"
                        )
                );

        // update fields
        drink.setName(request.getName());
        drink.setDescription(request.getDescription());
        drink.setPrice(request.getPrice());
        drink.setCategory(category);
        drink.setImageUrl(request.getImageUrl());

        if (request.getActive() != null) {
            drink.setActive(request.getActive());
        }

        // save
        Drink updated = drinkRepository.save(drink);

        // 5️⃣ Return DTO
        return mapToAdminDetailResponse(updated);
    }

    /**
     * deactivate a drink
     * @param id current drink id
     */
    public void softDelete(Integer id) {
        // find drink
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Drink not found",
                                ErrorCodes.DRINK_NOT_FOUND
                        )
                );

        // deactivate
        drink.deactivate();  // sets active = false

        // save
        drinkRepository.save(drink);
    }

    /**
     * Hard delete from the dataset
     * @param id drink id
     */
    public void hardDelete(Integer id) {

        // check existence first
        if (!drinkRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Drink not found"
            );
        }

        // permanently remove
        drinkRepository.deleteById(id);
    }


    // ============================ HELPER =====================================

    /**
     * Convert the drink to a DTO to send back
     * @param drink drink entity
     * @return public drink dto from drink entity
     */
    private PublicDrinkResponse mapToPublicDrinkResponse(Drink drink) {
        return new PublicDrinkResponse(
                drink.getId(),
                drink.getName(),
                drink.getDescription(),
                drink.getPrice(),
                drink.getImageUrl(),
                drink.getCategory().getName()
        );
    }


    /**
     * Convert the drink to a admin DTO
     * @param drink drink entity
     * @return dto for admin to show on dashboard
     */
    private AdminDrinkListResponse mapToAdminListResponse(Drink drink) {
        return new AdminDrinkListResponse(
                drink.getId(),
                drink.getName(),
                drink.getCategory().getName(),
                drink.getPrice(),
                drink.isActive(),
                drink.getUpdatedAt()
        );
    }

    private AdminDrinkDetailResponse mapToAdminDetailResponse(Drink drink) {
        return new AdminDrinkDetailResponse(
                drink.getId(),
                drink.getName(),
                drink.getDescription(),
                drink.getPrice(),
                drink.getCategory().getId(),
                drink.getImageUrl(),
                drink.isActive(),
                drink.getCreatedAt(),
                drink.getUpdatedAt()
        );
    }
}

