import { useState } from "react";
import logo from "../assets/logo2.webp";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/Roles";
import { hasMinRole, isAdmin } from "../utils/permission";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router";

export default function NavBar() {
  // read the user state
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useLogout();

  // manage the state of the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar__logo" />
      </Link>

      <button
        className={`navbar__hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`navbar__overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      <ul className={`navbar__links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/menu" onClick={closeMenu}>
            Menu
          </Link>
        </li>

        <li>
          <Link to="/about-us" onClick={closeMenu}>
            Giới Thiệu
          </Link>
        </li>

        {user && hasMinRole(user, ROLES.MANAGER) && (
          <li>
            <Link to="/menu-dashboard" onClick={closeMenu}>
              Menu Dashboard
            </Link>
          </li>
        )}

        {user && isAdmin(user) && (
          <li>
            <Link to="/manager-dashboard" onClick={closeMenu}>
              Manager Dashboard
            </Link>
          </li>
        )}

        {user && (
          <li>
            <button onClick={logout} className="navbar__logout">
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
