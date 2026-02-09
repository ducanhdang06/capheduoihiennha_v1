import { useState } from "react";
import logo from "../assets/logo2.png";
import "../styles/NavBar.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="" className="logo" />

      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Add overlay div */}
      <div
        className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
        <a href="/" onClick={closeMenu}>
          Home
        </a>
        <a href="/menu" onClick={closeMenu}>
          Menu
        </a>
        <a href="/about-us" onClick={closeMenu}>
          About Us
        </a>
        <a href="/login" onClick={closeMenu}>
          Login
        </a>
      </ul>
    </div>
  );
}
