package com.example.backend.drink;

import com.example.backend.category.Category;
import com.example.backend.category.CategoryRepository;
import com.example.backend.dto.AdminDrinkListDTO;
import com.example.backend.dto.DrinkRequest;
import com.example.backend.dto.DrinkResponse;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ErrorCodes;
import com.example.backend.exception.NotFoundException;
import com.example.backend.image.DrinkImage;
import com.example.backend.tag.Tag;
import com.example.backend.tag.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
// Transactional: keeps everything inside succeed / fail together
// keep the db session open while it runs
public class DrinkService {

    // need to have access to all tables to be able to create a drink
    private final DrinkRepository drinkRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public DrinkService(DrinkRepository drinkRepository, CategoryRepository categoryRepository, TagRepository tagRepository) {
        this.drinkRepository = drinkRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }

    // -------------------- READ --------------------
    public List<AdminDrinkListDTO> getAllForAdmin(String name, Boolean active) {

        if ((name == null || name.isBlank()) && active == null) {
            return drinkRepository.findAllForAdmin();
        }

        if (name != null && !name.isBlank() && active == null) {
            return drinkRepository.searchByName(name);
        }

        if ((name == null || name.isBlank()) && active != null) {
            return drinkRepository.findByActive(active);
        }

        return drinkRepository.searchByNameAndActive(name, active);
    }
    /**
     * Get all active drinks with optional filtering by category and/or tag
     * @param categoryId - filter by category (optional, can be null)
     * @param tag - filter by tag name (optional, can be null)
     * @return List of DrinkResponse DTOs
     */
    public List<DrinkResponse> getAllDrinks(Integer categoryId, String tag) {
        // Step 1: Fetch all active drinks from database
        List<Drink> drinks = drinkRepository.findAllActive();

        // Step 2: Apply filters and convert to response DTOs
        return drinks.stream()
                // Filter by categoryId if provided (null means "show all categories")
                .filter(d -> categoryId == null || d.getCategory().getId().equals(categoryId))
                // Filter by tag if provided (null means "show all tags")
                // anyMatch checks if the drink has at least one tag matching the name
                .filter(d -> tag == null || d.getTags().stream().anyMatch(t -> t.getName().equalsIgnoreCase(tag)))
                // Convert each Drink entity to DrinkResponse DTO
                .map(this::toResponse)
                // Collect results into a List
                .toList();
    }

    /**
     * Get a single drink by its ID
     * @param id - the drink ID
     * @return DrinkResponse DTO
     * @throws EntityNotFoundException if drink doesn't exist
     */
    @Transactional(readOnly = true)
    public DrinkResponse getDrinkById(Integer id) {
        // Fetch drink from database or throw exception if not found
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Drink not found with id " + id, ErrorCodes.DRINK_NOT_FOUND));

        // Convert entity to DTO and return
        return toResponse(drink);
    }

    // -------------------- CREATE --------------------

    /**
     * Create a new drink with tags and images
     * @param request - DTO containing drink data from client
     * @return DrinkResponse DTO of the created drink
     * @throws EntityNotFoundException if category doesn't exist
     */
    public DrinkResponse createDrink(DrinkRequest request) {

        // prevent drink with similar names
        if (drinkRepository.existsByNameIgnoreCase(request.getName())) {
            throw new BusinessException(
                    "Drink already exists",
                    ErrorCodes.DRINK_DUPLICATE
            );
        }

        // Step 1: Verify the category exists in the database
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found with id " + request.getCategoryId(),
                        ErrorCodes.CATEGORY_NOT_FOUND));

        // Step 2: Create new Drink entity and set basic fields
        Drink drink = new Drink();
        drink.setName(request.getName());
        drink.setDescription(request.getDescription());
        drink.setPrice(request.getPrice());
        drink.setCategory(category); // Associate with the category

        // Step 3: Handle many-to-many tags (create new tags if needed)
        attachTags(drink, request.getTags());

        // Step 4: Handle one-to-many images (create new image records)
        attachImages(drink, request.getImages());

        // Step 5: Save drink to database (cascade saves tags and images too)
        // Then convert to DTO and return
        return toResponse(drinkRepository.save(drink));
    }

    // -------------------- UPDATE --------------------

    /**
     * Update an existing drink completely (replaces all fields)
     * @param id - the drink ID to update
     * @param request - new drink data
     * @return DrinkResponse DTO of updated drink
     * @throws EntityNotFoundException if drink or category not found
     */
    public DrinkResponse updateDrink(Integer id, DrinkRequest request) {
        // Step 1: Fetch the existing drink from database
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Drink not found with id " + id,
                        ErrorCodes.DRINK_NOT_FOUND
                ));

        // Step 2: Verify the new category exists
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new NotFoundException(
                        "Category not found with id " + request.getCategoryId(),
                        ErrorCodes.CATEGORY_NOT_FOUND
                ));

        // Step 3: Update basic fields with new values
        drink.setName(request.getName());
        drink.setDescription(request.getDescription());
        drink.setPrice(request.getPrice());
        drink.setCategory(category);

        // Step 4: Clear existing tags and images
        // This removes the old relationships from the join tables
        drink.getTags().clear();
        drink.getImages().clear();

        // Step 5: Add new tags and images from the request
        attachTags(drink, request.getTags());
        attachImages(drink, request.getImages());

        // Step 6: Save updated drink and return as DTO
        return toResponse(drinkRepository.save(drink));
    }

    // -------------------- DELETE (SOFT) --------------------

    /**
     * Soft delete a drink (mark as inactive instead of removing from DB)
     * @param id - the drink ID to delete
     * @throws EntityNotFoundException if drink not found
     */
    public void deleteDrink(Integer id) {

        // Step 1: Fetch the drink to delete
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Drink not found with id " + id,
                        ErrorCodes.DRINK_NOT_FOUND
                ));

        if (!drink.isActive()) {
            throw new BusinessException(
                    "Drink already inactive",
                    ErrorCodes.DRINK_ALREADY_INACTIVE
            );
        }

        // Step 2: Mark as inactive (sets is_active = false)
        drink.deactivate();

        // Step 3: Save the change to database
        drinkRepository.save(drink);
    }

    // -------------------- SEARCH --------------------
    @Transactional(readOnly = true)
    public List<DrinkResponse> searchDrinks(
            String name,
            Integer categoryId,
            String tag
    ) {
        List<Drink> drinks = drinkRepository.findAll(); // admin sees all

        return drinks.stream()
                // name search (partial, case-insensitive)
                .filter(d ->
                        name == null ||
                                d.getName().toLowerCase().contains(name.toLowerCase())
                )
                // category filter
                .filter(d ->
                        categoryId == null ||
                                d.getCategory().getId().equals(categoryId)
                )
                // tag filter
                .filter(d ->
                        tag == null ||
                                d.getTags().stream()
                                        .anyMatch(t -> t.getName().equalsIgnoreCase(tag))
                )
                .map(this::toResponse)
                .toList();
    }


    // -------------------- HELPERS --------------------

    /**
     * Attach tags to a drink (creates new tags if they don't exist)
     * Handles the many-to-many relationship between drinks and tags
     * @param drink - the drink entity to attach tags to
     * @param tagNames - list of tag names from the request
     */
    private void attachTags(Drink drink, List<String> tagNames) {
        // If no tags provided, do nothing
        if (tagNames == null) return;

        // For each tag name, find existing tag or create new one
        Set<Tag> tags = tagNames.stream()
                .map(name ->
                        // Try to find tag by name (case-insensitive)
                        tagRepository.findByNameIgnoreCase(name)
                                // If tag doesn't exist, create and save it
                                .orElseGet(() -> tagRepository.save(new Tag(name)))
                )
                // Collect into a Set (no duplicates)
                .collect(Collectors.toSet());

        // Add all tags to the drink's tag collection
        // This updates the drink_tags join table
        drink.getTags().addAll(tags);
    }

    /**
     * Attach images to a drink
     * Handles the one-to-many relationship between drinks and images
     * @param drink - the drink entity to attach images to
     * @param imageUrls - list of image URLs from the request
     */
    private void attachImages(Drink drink, List<String> imageUrls) {
        // If no images provided, do nothing
        if (imageUrls == null) return;

        // Loop through each image URL with index
        for (int i = 0; i < imageUrls.size(); i++) {
            // Create new DrinkImage entity
            DrinkImage image = new DrinkImage();
            image.setImageUrl(imageUrls.get(i)); // Set the URL
            image.setPrimary(i == 0); // First image is primary, rest are not
            image.setDrink(drink); // Set bidirectional relationship

            // Add image to drink's collection
            // This will be saved to drink_images table when drink is saved
            drink.getImages().add(image);
        }
    }

    /**
     * Convert Drink entity to DrinkResponse DTO
     * Maps domain model to API response format
     * @param drink - the entity to convert
     * @return DrinkResponse DTO for API response
     */
    private DrinkResponse toResponse(Drink drink) {
        // Create new DTO object
        DrinkResponse response = new DrinkResponse();

        // Map basic fields directly
        response.setId(drink.getId());
        response.setName(drink.getName());
        response.setDescription(drink.getDescription());
        response.setPrice(drink.getPrice());

        // Get category name (not the whole category object)
        response.setCategory(drink.getCategory().getName());

        // Extract tag names from Tag entities
        response.setTags(
                drink.getTags().stream()
                        .map(Tag::getName) // Get just the name string
                        .toList()
        );

        // Extract image URLs from DrinkImage entities
        response.setImages(
                drink.getImages().stream()
                        .map(DrinkImage::getImageUrl) // Get just the URL string
                        .toList()
        );

        return response;
    }
}

