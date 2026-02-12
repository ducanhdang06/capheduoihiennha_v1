import { useRef, useEffect, useState } from "react";
import gallery1 from "../../assets/gallery/gallery-1.webp";
import gallery2 from "../../assets/gallery/gallery-2.webp";
import gallery3 from "../../assets/gallery/gallery-3.webp";
import gallery4 from "../../assets/gallery/gallery-4.webp";
import gallery5 from "../../assets/gallery/gallery-5.webp";
import gallery6 from "../../assets/gallery/gallery-6.webp";
import gallery7 from "../../assets/gallery/gallery-7.webp";
import gallery8 from "../../assets/gallery/gallery-8.webp";
import "../../styles/GallerySection.css"

export default function GallerySection() {
  const galleryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Array of your gallery images
  const images = [
    { src: gallery1, alt: "Coffee shop atmosphere" },
    { src: gallery2, alt: "Signature latte art" },
    { src: gallery3, alt: "Barista crafting coffee" },
    { src: gallery4, alt: "Interior seating area" },
    { src: gallery5, alt: "Fresh pastries" },
    { src: gallery6, alt: "Espresso machine" },
    { src: gallery7, alt: "Cozy window seating" },
    { src: gallery8, alt: "Coffee beans close-up" },
  ];

  // Mouse drag functionality for desktop
  const handleMouseDown = (e) => {
    if (window.innerWidth >= 1024) return; // Disable dragging on desktop grid
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener("mousemove", handleMouseMove);
      gallery.addEventListener("mouseup", handleMouseUp);
      gallery.addEventListener("mouseleave", handleMouseUp);

      return () => {
        gallery.removeEventListener("mousemove", handleMouseMove);
        gallery.removeEventListener("mouseup", handleMouseUp);
        gallery.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>Our Space</h2>
        <p>A glimpse into our daily craft</p>
      </div>

      <div
        className="gallery-container"
        ref={galleryRef}
        onMouseDown={handleMouseDown}
      >
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
