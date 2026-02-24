import { normalizeVietnamese } from "./text";

/**
 * Apply all filter in one place
 */
export function applyDrinkFilters(drinks = [], filters = {}) {
  const {
    search = "",
    categoryId = "all",
    status = "all", // all | active | inactive
    sort = "none", // none | price-asc | price-dsc
  } = filters;

  let result = [...drinks];

  // search by name
  if (search) {
    const normalizedSearch = normalizeVietnamese(search);
    result = result.filter((drink) =>
      normalizeVietnamese(drink.name).includes(normalizedSearch),
    );
  }

  // filter by category
  if (categoryId !== "all") {
    result = result.filter(
      (drink) => drink.categoryName === categoryId,
    );
  }

  // filter by active
  if (status === "active") {
    result = result.filter((drink) => drink.active === true);
  }

  // filter by inactive
  if (status === "inactive") {
    result = result.filter((drink) => drink.active === false);
  }

  // sort by price ascending
  if (sort === "price-asc") {
    console.log('price-asc');
    result.sort((a, b) => a.price - b.price);
  }

  // sort by price descending
  if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  if (sort === "none") {
    result.sort((a, b) => a.id - b.id);
  }

  if (sort === "new-to-old") {
    result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  if (sort === "old-to-new") {
    result.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  }

  return result;
  
}
