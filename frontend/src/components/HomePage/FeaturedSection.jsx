import { featuredDrinks } from "../../constants/FeaturedDrinks";
import "../../styles/FeaturedSection.css"
/**
 * Showcase the signature drinks from the
 */
export default function FeaturedSection() {
  return (
    <section className="signature-drinks-section">
      <div className="signature-drinks-container">
        {/* Header */}
        <div className="signature-header">
          <h1 className="home-section-title"> Signature Collection</h1>
          <p>
            Đồ uống đặc biệt, được chế tác với sự tinh chuẩn và nét tinh tế riêng.
          </p>
        </div>

        {/* Drinks Grid */}
        <div className="drinks-grid">
          {featuredDrinks.map((drink, index) => (
            <div key={drink.id} className={`drink-card drink-${index + 1}`}>
              <img src={drink.image} alt={drink.alt} className="drink-image" />
              <div className="drink-overlay">
                <div className="drink-number">{drink.number}</div>
                <h2 className="drink-title">{drink.title}</h2>
                <p className="drink-description">{drink.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="cta-container">
          <a href="/menu" className="cta-button">
            Xem Menu
          </a>
        </div>
      </div>
    </section>
  );
}
