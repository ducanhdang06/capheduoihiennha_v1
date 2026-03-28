import "../../styles/MenuPage.css";

export default function DrinkCard({ data }) {
  return (
    <div className="menu__card">
      <div className="menu__card-img-wrap">
        <img src={data.imageUrl} alt="Cappuccino" className="menu__card-img"/>
      </div>
      <div className="menu__card-info">
        <h3 className="menu__card-name">{data.name}</h3>
        <p className="menu__card-price">{data.price}đ</p>
      </div>
    </div>
  );
}
