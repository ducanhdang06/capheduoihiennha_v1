import { reviews } from "../../constants/Reviews";
import "../../styles/ReviewSection.css";
import "../../styles/animations.css";
import { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/**
 * Scrolling marquee of customer reviews.
 * The section title fades in on scroll; the marquee runs its own CSS animation
 * and is left untouched.
 */
export default function ReviewSection() {
  const [isPaused, setIsPaused] = useState(false);
  const titleRef = useScrollAnimation();

  return (
    <section className="reviews">
      <h2 className="reviews__title fade-in-up" ref={titleRef}>Reviews</h2>

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
