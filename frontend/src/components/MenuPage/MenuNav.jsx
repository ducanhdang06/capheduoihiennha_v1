import { useState, useEffect, useRef } from "react";
import "../../styles/MenuNav.css";

/**
 * Sticky horizontal navigation bar listing all menu categories.
 * Clicking a category smoothly scrolls to its section.
 * Uses IntersectionObserver to highlight whichever category is
 * currently dominant in the viewport, and auto-scrolls the nav
 * bar to keep the active button centered and visible.
 *
 * @param {Object[]} categories - Array of { id, name } objects from the menu API
 */
export default function MenuNav({ categories }) {
  const [activeId, setActiveId] = useState(null);
  const [scrolledLeft, setScrolledLeft] = useState(false);
  const observerRef = useRef(null);
  const navInnerRef = useRef(null);

  // Set up IntersectionObserver to track which category section is in view
  useEffect(() => {
    if (!categories.length) return;

    // rootMargin crops the observation zone so a category is only
    // "active" once it's well into view, not merely at the edge
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Among all intersecting sections, pick the topmost one
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          // Extract numeric id from "category-{id}" element id
          const rawId = visible[0].target.id.replace("category-", "");
          setActiveId(Number(rawId));
        }
      },
      {
        // Top 20% is the sticky nav zone; ignore bottom 60% so the
        // active category updates before the section fully clears
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    // Observe each rendered category section
    categories.forEach(({ id }) => {
      const el = document.getElementById(`category-${id}`);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [categories]);

  // Show left-edge fade once the user has scrolled the nav bar right
  useEffect(() => {
    const container = navInnerRef.current;
    if (!container) return;

    function handleScroll() {
      setScrolledLeft(container.scrollLeft > 8);
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll the nav bar so the active button is always centered
  // in the scrollable container — critical on mobile where not all
  // category buttons fit on screen at once
  useEffect(() => {
    if (!activeId || !navInnerRef.current) return;

    const container = navInnerRef.current;
    const activeBtn = container.querySelector(".menu-nav__item--active");
    if (!activeBtn) return;

    // Calculate the scroll position that centers the active button
    const containerWidth = container.offsetWidth;
    const btnLeft = activeBtn.offsetLeft;
    const btnWidth = activeBtn.offsetWidth;
    const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2;

    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeId]);

  /**
   * Smoothly scrolls the viewport to the target category section.
   * Also sets active state immediately so the UI feels responsive.
   *
   * @param {number} id - The category id to scroll to
   */
  function handleClick(id) {
    const el = document.getElementById(`category-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  }

  if (!categories.length) return null;

  return (
    <nav className={`menu-nav${scrolledLeft ? " scrolled-left" : ""}`} aria-label="Menu categories">
      <div className="menu-nav__inner" ref={navInnerRef}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`menu-nav__item${activeId === cat.id ? " menu-nav__item--active" : ""}`}
            onClick={() => handleClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
