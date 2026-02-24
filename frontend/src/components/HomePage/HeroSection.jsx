import { Link } from "react-router-dom";
import "../../styles/HeroSection.css";
import heroBig from "../../assets/hero-big.webp";
import heroSmall from "../../assets/hero-small.webp";

export default function HeroSection() {
  return (
    <section className="hero">
      <picture>
        <source media="(max-width: 768px)" srcSet={heroSmall} width="768" height="1660" />
        <img
          src={heroBig}
          alt=""
          className="hero-bg"
          fetchPriority="high"
          width="1512" 
          height="615"
        />
      </picture>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>Tiệm Cà Phê Dưới Hiên Nhà</h1>
        <p className="hero-tagline">
          Một góc <span>Đà Lạt</span> giữa lòng <span>Cửa Lò</span>
        </p>

        <div className="hero-actions">
          <a href="#location" className="btn-primary">
            Ghé Quán
          </a>

          <Link to="/menu" className="btn-secondary">
            Xem Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
