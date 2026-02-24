import React from "react";
import "../../styles/DrinksTable.css"

export default function DrinksTable({ drinks, onEdit }) {

  return (
    <div className="table-wrapper">
    <table className="coffee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Đồ Uống</th>
          <th>Loại Đồ Uống</th>
          <th>Giá Tiền</th>
          <th>Status</th>
          <th>Updated</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {[...drinks]
          // .sort((a, b) => a.id - b.id)
          .map((drink) => (
            <tr key={drink.id}>
              <td>{drink.id}</td>
              <td style={{ fontWeight: 500 }}>{drink.name}</td>
              <td>{drink.categoryName}</td>
              <td>{drink.price.toLocaleString()} đ</td>
              <td>
                {drink.active ? "Active" : "Inactive"}
              </td>
              <td>
                {new Date(drink.updatedAt).toLocaleDateString()}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => onEdit(drink)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  );
}