import { useEffect, useState } from "react";
import { getDrinks } from "../api/drink.api";
import { getAllDrinks } from "../api/drink.api";
import { getCategoryDrinksMenu } from "../api/drink.api";
import DrinkCard from "../components/MenuPage/DrinkCard";
import "../styles/MenuPage.css";
import CategoryCard from "../components/MenuPage/Category";
import MenuHero from "../components/MenuPage/MenuHero";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // define asynchronous function to load the data
    async function loadCategories() {
      const data = await getCategoryDrinksMenu();
      setCategories(data);
    }

    // call the function
    loadCategories();
  }, []);

  return (
    <>
      <MenuHero />
      <main className="menu">
        <div className="menu__category-list">
          {categories.map((category) => (
            <CategoryCard key={category.id} data={category} />
          ))}
        </div>
      </main>
    </>
  );
}
