import "../../styles/MenuPage.css";

/**
 * Placeholder card shown while the menu data is loading.
 * Mirrors the exact DOM structure of DrinkCard so the skeleton occupies
 * the same dimensions — preventing layout shift when real cards appear.
 */
export default function DrinkCardSkeleton() {
  return (
    <div className="menu__card menu__card--skeleton">
      {/* Image area — same 4:5 aspect ratio as DrinkCard's img-wrap */}
      <div className="menu__card-img-wrap skeleton-block" />

      {/* Info area — stacked name + price lines instead of real text */}
      <div className="menu__card-info menu__card-info--skeleton">
        <div className="skeleton-block skeleton-name" />
        <div className="skeleton-block skeleton-price" />
      </div>
    </div>
  );
}
