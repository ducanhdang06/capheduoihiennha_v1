import { featuredDrinks } from "../../constants/FeaturedDrinks";
import "../../styles/FeaturedSection.css";
import "../../styles/animations.css";
import { Link } from "react-router";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/**
 * Showcase the signature drinks from the cafe's featured collection.
 * The header fades in first; the drink cards stagger in sequence behind it.
 */
export default function FeaturedSection() {
  const headerRef = useScrollAnimation();
  // Lower threshold so the grid triggers before all cards are visible.
  const gridRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="featured">
      <div className="featured__container">
        {/* Header */}
        <div className="featured__header fade-in-up" ref={headerRef}>
          <h1 className="featured__title"> Signature Collection</h1>
          <p>
            Đồ uống đặc biệt, được chế tác với sự tinh chuẩn và nét tinh tế
            riêng.
          </p>
        </div>

        {/* Drinks Grid — stagger-children staggers each card via CSS nth-child delay */}
        <div className="featured__grid stagger-children" ref={gridRef}>
          {featuredDrinks.map((drink) => (
            <div key={drink.id} className="featured__card">
              <img src={drink.image} alt={drink.alt} className="featured__card-img" />
              <div className="featured__card-overlay">
                <div className="featured__card-number">{drink.number}</div>
                <h2 className="featured__card-title">{drink.title}</h2>
                <p className="featured__card-desc">{drink.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="featured__cta">
          <Link to="/menu" className="featured__cta-btn">
            Xem Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
