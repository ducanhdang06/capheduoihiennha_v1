import { useEffect, useState } from "react";
import { getDrinks } from "../api/drink.api";
import { getAllDrinks } from "../api/drink.api";
import DrinkCard from "../components/DrinkCard/DrinkCard";
import "../styles/MenuPage.css";

export default function MenuPage() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // define asynchronous function to load the data
    async function loadDrinks() {
      const data = await getAllDrinks();
      setDrinks(data);
    }

    // call the function
    loadDrinks();
  }, []);

  return (
    <div className="menu-page">
      <div className="drinks-container">
        {drinks.map((drink) => (
          <DrinkCard key={drink.id} data={drink} />
        ))}
      </div>
    </div>
  );
}
