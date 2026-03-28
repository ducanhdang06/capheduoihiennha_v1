import { reviews } from "../../constants/Reviews";
import "../../styles/ReviewSection.css";
import { useState } from "react";

export default function ReviewSection() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <section className="reviews">
      <h2 className="reviews__title">Reviews</h2>

      <div
        className={`reviews__marquee ${isPaused ? "paused" : ""}`}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        <div className="reviews__marquee-track">
          {/* Duplicate reviews for seamless loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div className="reviews__card" key={index}>
              <div className="reviews__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= review.rating ? "reviews__star filled" : "reviews__star empty"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="reviews__card-text">"{review.text}"</p>
              <p className="reviews__card-name">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
