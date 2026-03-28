import "../../styles/LocationSection.css";
import "../../styles/animations.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/**
 * Location section with address, opening hours, phone, and embedded Google Map.
 * The info and map columns stagger in when the grid enters the viewport.
 */
export default function LocationSection() {
  const titleRef = useScrollAnimation();
  // Lower threshold so the grid triggers before both columns are fully visible.
  const gridRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="location" id="location">
      {/* Section Title */}
      <h2 className="location__title fade-in-up" ref={titleRef}>Địa Chỉ & Giờ Mở Cửa</h2>

      {/* Tagline */}
      <p className="location__tagline">Stop by for your morning brew.</p>

      {/* Content Grid — two columns (info + map) stagger in */}
      <div className="location__grid stagger-children" ref={gridRef}>
        {/* Left Column - Info */}
        <div className="location__info">
          <div className="location__block">
            <h3>Địa Chỉ</h3>
            <p>43 Đường Nguyễn Duy Trinh</p>
            <p>Vinh, Nghệ An, Vietnam</p>
            <a
              href="https://maps.app.goo.gl/d8HbEus8T1uBPAcR8"
              target="_blank"
              rel="noopener noreferrer"
              className="location__link"
            >
              Google Map →
            </a>
          </div>

          <div className="location__block">
            <h3>Giờ Mở Cửa</h3>
            <div className="location__hours-row">
              <span>Mỗi Ngày</span>
              <span>7:00 AM – 6:00 PM</span>
            </div>
          </div>

          <div className="location__block">
            <h3>Số Điện Thoại</h3>
            <a href="tel:+84949866688" className="location__phone">
              0949866688
            </a>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="location__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26744.714681948306!2d105.70049920428404!3d18.797425172036988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cd001cc1a223%3A0xf0c307a6384a861!2zVGnhu4dtIEPDoCBQaMOqIETGsOG7m2kgSGnDqm4gTmjDoA!5e0!3m2!1sen!2sus!4v1770858502539!5m2!1sen!2sus"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Cafe Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
