import React from "react";
import testImg from "../../assets/drinkTestImg.png";
import DrinkCard from "./DrinkCard";

export default function CategoryCard({ data }) {
  return (
    <div className="category-card">
      <h2 className="category-card__header">{data.name}</h2>
      <div className="category-card__drink-grid">
        {data.drinks.map((drink) => (
          <DrinkCard key={drink.id} data={drink} />
        ))}
      </div>
    </div>
  );
}
