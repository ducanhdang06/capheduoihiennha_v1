import React from "react";
import testImg from "../../assets/drinkTestImg.png";
import "../../styles/MenuHero.css";

export default function MenuHero() {
  return (
    <section className="menu-hero">
      <div className="menu-hero__overlay" />
      <div className="menu-hero__content">
        <h1 className="menu-hero__title">Menu</h1>
        <p className="menu-hero__subtitle">Cà phê – Trà – Thức uống thủ công</p>
      </div>
    </section>
  );
}
