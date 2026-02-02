import React from 'react'
import testImg from "../../assets/drinkTestImg.png";
import "./DrinkCard.css"

export default function DrinkCard ({data}) {
    return (
       <div className='drink-card'>
         <img className='drink-img' src={testImg}></img>
         <h3 className='drink-name'>{data.name}</h3>
         <p className='drink-price'>{data.price}</p>
       </div>
    )
}
