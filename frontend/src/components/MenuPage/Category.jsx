import DrinkCard from "./DrinkCard";

export default function CategoryCard({ data }) {
  return (
    <div className="menu__category">
      <h2 className="menu__category-title">{data.name}</h2>
      <div className="menu__category-grid">
        {data.drinks.map((drink) => (
          <DrinkCard key={drink.id} data={drink} />
        ))}
      </div>
    </div>
  );
}
