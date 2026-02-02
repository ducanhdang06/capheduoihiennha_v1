import React from "react";
import testImg from "../../assets/drinkTestImg.png";
import "./DrinkCard.css";

export default function DrinkCard({ data }) {
  return (
    <div class="drink-card">
      <div class="drink-img-container">
        <img src={data.images[0]} alt="Cappuccino" class="drink-img" />
      </div>
      <div class="drink-info">
        <h3 class="drink-name">{data.name}</h3>
        <p class="drink-price">{data.price}đ</p>
      </div>
    </div>
  );
}
