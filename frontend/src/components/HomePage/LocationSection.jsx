import "../../styles/LocationSection.css";

export default function LocationSection() {
  return (
    <section className="location" id="location">
      {/* Section Title */}
      <h2 className="home-section-title">Địa Chỉ & Giờ Mở Cửa</h2>

      {/* Tagline */}
      <p className="location-tagline">Stop by for your morning brew.</p>

      {/* Content Grid */}
      <div className="location-container">
        {/* Left Column - Info */}
        <div className="location-info">
          <div className="location-block">
            <h3>Địa Chỉ</h3>
            <p>43 Đường Nguyễn Duy Trinh</p>
            <p>Vinh, Nghệ An, Vietnam</p>
            <a
              href="https://maps.app.goo.gl/d8HbEus8T1uBPAcR8"
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
            >
              Google Map →
            </a>
          </div>

          <div className="location-block">
            <h3>Giờ Mở Cửa</h3>
            <div className="hours-row">
              <span>Mỗi Ngày</span>
              <span>7:00 AM – 6:00 PM</span>
            </div>
          </div>

          <div className="location-block">
            <h3>Số Điện Thoại</h3>
            <a href="tel:+84949866688" className="phone-link">
              0949866688
            </a>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="location-map">
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
