import "../../styles/MenuPage.css";

/**
 * Displays a single drink as a portrait card.
 * On hover (desktop), a dark gradient overlay fades in over the image
 * to reveal the drink description — matching the editorial style of
 * the home page's Featured section.
 *
 * @param {Object} data - Drink object from the public menu API
 * @param {string} data.name
 * @param {string} data.description
 * @param {number} data.price
 * @param {string} data.imageUrl
 */
export default function DrinkCard({ data }) {
  return (
    <div className="menu__card">
      {/* Image + description overlay container */}
      <div className="menu__card-img-wrap">
        <img src={data.imageUrl} alt={data.name} className="menu__card-img" />

        {/* Description overlay — fades in on hover, hidden on mobile */}
        {data.description && (
          <div className="menu__card-overlay">
            <p className="menu__card-desc">{data.description}</p>
          </div>
        )}
      </div>

      {/* Name and price — always visible */}
      <div className="menu__card-info">
        <h3 className="menu__card-name">{data.name}</h3>
        <p className="menu__card-price">{Math.round(data.price / 1000)}k</p>
      </div>
    </div>
  );
}
