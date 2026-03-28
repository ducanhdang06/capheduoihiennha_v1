import { featuredDrinks } from "../../constants/FeaturedDrinks";
import "../../styles/FeaturedSection.css";
import { Link } from "react-router";
/**
 * Showcase the signature drinks from the
 */
export default function FeaturedSection() {
  return (
    <section className="featured">
      <div className="featured__container">
        {/* Header */}
        <div className="featured__header">
          <h1 className="featured__title"> Signature Collection</h1>
          <p>
            Đồ uống đặc biệt, được chế tác với sự tinh chuẩn và nét tinh tế
            riêng.
          </p>
        </div>

        {/* Drinks Grid */}
        <div className="featured__grid">
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
