import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned (or provided) ref element.
 * When the element enters the viewport, adds the CSS class 'visible' and
 * stops observing (so the animation fires only once, not on every scroll).
 *
 * Pair with `.fade-in-up` or `.stagger-children` in animations.css.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15] - Fraction of the element that must be
 *   visible before the observer fires (0 = any pixel, 1 = fully visible).
 * @param {React.RefObject} [options.ref] - Optional external ref to observe.
 *   Pass this when the element's ref is already used for something else (e.g. drag
 *   scroll). If omitted, a new internal ref is created and returned.
 * @returns {React.RefObject} The ref to attach to the DOM element (either the
 *   provided external ref or a newly created internal one).
 *
 * @example — basic usage
 *   const ref = useScrollAnimation();
 *   <div className="fade-in-up" ref={ref}>...</div>
 *
 * @example — shared ref (element already has a ref for other logic)
 *   const dragRef = useRef(null);
 *   useScrollAnimation({ ref: dragRef, threshold: 0.1 });
 *   <div className="stagger-children" ref={dragRef}>...</div>
 */
export function useScrollAnimation({ threshold = 0.15, ref: externalRef } = {}) {
  const internalRef = useRef(null);
  // Prefer the caller-supplied ref; fall back to the internally created one.
  const ref = externalRef || internalRef;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Add 'visible' class as soon as the element is sufficiently in the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve after first trigger — animate once only.
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(el);

    // Clean up observer on unmount or if options change.
    return () => observer.disconnect();
  }, [threshold, ref]);

  return ref;
}
