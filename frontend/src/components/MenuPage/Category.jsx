import DrinkCard from "./DrinkCard";

/**
 * Renders a single menu category section: a styled header followed
 * by a responsive grid of DrinkCards.
 *
 * The element id ("category-{id}") is used by MenuNav's
 * IntersectionObserver and smooth-scroll anchor logic.
 *
 * @param {Object} data - Category object from the menu API
 * @param {number} data.id
 * @param {string} data.name
 * @param {Object[]} data.drinks - Drinks belonging to this category
 */
export default function CategoryCard({ data }) {
  return (
    <div className="menu__category" id={`category-${data.id}`}>
      {/* Category header with decorative divider */}
      <div className="menu__category-header">
        <h2 className="menu__category-title">{data.name}</h2>
        <span className="menu__category-rule" aria-hidden="true" />
      </div>

      <div className="menu__category-grid">
        {data.drinks.map((drink) => (
          <DrinkCard key={drink.id} data={drink} />
        ))}
      </div>
    </div>
  );
}
