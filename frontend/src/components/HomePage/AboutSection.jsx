import "../../styles/AboutSection.css";
import { Link } from "react-router";

export default function AboutSection() {
  return (
    <section className="about">
      <div className="about__container">
        <div>
          <h2 className="about__title">Về Chúng Tôi</h2>
          <p className="about__body">
            Chúng tôi tin rằng cà phê không chỉ là một thức uống, mà là một nghi
            thức mỗi ngày — một khoảnh khắc để chậm lại giữa nhịp sống vội vã.
            Mỗi tách cà phê được chuẩn bị với sự tinh chuẩn và tôn trọng dành
            cho từng hạt cà phê được tuyển chọn kỹ lưỡng.
          </p>
          <p className="about__body">
            Không gian được tạo nên để bạn có thể tạm dừng, trò chuyện, hoặc đơn
            giản là tận hưởng sự tĩnh lặng cùng một tách cà phê được pha chế đầy
            chăm chút. Ở đây, mọi chi tiết đều hướng đến sự giản đơn và tinh tế.
          </p>
          <div className="about__cta">
            <Link to="/about-us" className="about__cta-btn">
              Đọc Thêm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
