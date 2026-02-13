import React from "react";
import testImg from "../../assets/drinkTestImg.png";
import "../../styles/MenuPage.css";

export default function DrinkCard({ data }) {
  return (
    <div className="menu-drink-card">
      <div className="drink-card__img-container">
        <img src={data.imageUrl} alt="Cappuccino" className="drink-card__img"/>
      </div>
      <div className="drink-card__info">
        <h3 className="drink-card__name">{data.name}</h3>
        <p className="drink-card__price">{data.price}đ</p>
      </div>
    </div>
  );
}
