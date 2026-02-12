import { reviews } from "../../constants/Reviews";
import "../../styles/ReviewSection.css";

export default function ReviewSection() {
  return (
    <section className="reviews">
      <h2 className="home-section-title">Reviews</h2>

      <div className="marquee">
        <div className="marquee-track">
          {/* Duplicate reviews for seamless loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div className="review-card" key={index}>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= review.rating ? "star filled" : "star empty"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="review-text">“{review.text}”</p>
              <p className="review-name">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
