import { useEffect, useState } from "react";
import "../styles/MenuPage.css";
import CategoryCard from "../components/MenuPage/Category";
import DrinkCardSkeleton from "../components/MenuPage/DrinkCardSkeleton";
import MenuHero from "../components/MenuPage/MenuHero";
import MenuNav from "../components/MenuPage/MenuNav";
import { getMenu } from "../api/public.api";

/**
 * Full public menu page.
 * Fetches all categories + their drinks from the API, renders a
 * cinematic hero, a sticky category navigation bar, and a sectioned
 * grid of drink cards.
 *
 * While data is in-flight, 8 skeleton cards fill the grid so the page
 * never appears blank — preventing a jarring content pop-in.
 */
export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  // True until the first API response arrives; drives skeleton visibility.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define asynchronous function to load the data
    async function loadCategories() {
      const data = await getMenu();
      setCategories(data);
      // Mark loading complete only after data is set so React batches
      // the state updates and avoids an intermediate empty render.
      setIsLoading(false);
    }

    // Call the function on mount
    loadCategories();
  }, []);

  return (
    <>
      <MenuHero />
      {/* Sticky nav renders once categories are loaded */}
      <MenuNav categories={categories} />
      <main className="menu">
        <div className="menu__categories">
          {isLoading ? (
            /* Show a flat grid of skeleton cards while the API is in-flight.
               8 cards fill the viewport on all breakpoints (2-col mobile → 4-col desktop). */
            <div className="menu__category-grid">
              {Array.from({ length: 8 }, (_, i) => (
                <DrinkCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <CategoryCard key={category.id} data={category} />
            ))
          )}
        </div>
      </main>
    </>
  );
}
