import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import "../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <h3 className="footer-title">
            Tiệm Cà Phê Dưới Hiên Nhà
          </h3>
          <p className="footer-tagline">
            Một góc Đà Lạt giữa lòng Cửa Lò
          </p>
        </div>

        {/* RIGHT */}
        <div className="footer-info">

          <div className="footer-item">
            <span className="footer-label">Địa chỉ</span>
            <p>43 Đường Nguyễn Duy Trinh, phường, Vinh, Nghệ An, Vietnam</p>
          </div>

          <div className="footer-item">
            <span className="footer-label">Giờ mở cửa</span>
            <p>07:00 – 22:00</p>
          </div>

          <div className="footer-item">
            <span className="footer-label">Liên hệ</span>
            <p>+84 949 866 688</p>
          </div>

          {/* SOCIAL */}
          <div className="footer-social">
            <a href="https://www.instagram.com/cafe_duoi_hiennha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram của Cà Phê Dưới Hiên Nhà">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/p/Ti%E1%BB%87m-C%C3%A0-Ph%C3%AA-D%C6%B0%E1%BB%9Bi-Hi%C3%AAn-Nh%C3%A0-61577960040967/" target="_blank" rel="noopener noreferrer" aria-label="Facebook của Cà Phê Dưới Hiên Nhà">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@cafeduoihiennha" target="_blank" rel="noopener noreferrer" aria-label="TikTok của Cà Phê Dưới Hiên Nhà">
              <FaTiktok />
            </a>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Tiệm Cà Phê Dưới Hiên Nhà
      </div>
    </footer>
  );
}