import React from "react";
import "../../styles/DrinksTable.css";

/**
 * DrinksTable — renders the admin drink list as a sortable table.
 *
 * Displays a thumbnail, name, category, price, status badge, last-updated date,
 * and edit/delete actions for each drink. Shows an empty state when the filtered
 * list is empty so the user knows to clear their filters.
 *
 * @param {{ drinks: Array, onEdit: Function, onDelete: Function }} props
 */
export default function DrinksTable({ drinks, onEdit, onDelete }) {
  return (
    <div className="drinks-table">
      <table className="drinks-table__table">
        <thead>
          <tr>
            {/* Thumbnail column — replaces the ID column */}
            <th className="drinks-table__th--img"></th>
            <th>Tên Đồ Uống</th>
            <th>Loại Đồ Uống</th>
            <th>Giá Tiền</th>
            <th>Status</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {drinks.length === 0 ? (
            /* Empty state — shown when filters return no results */
            <tr>
              <td colSpan={7} className="drinks-table__empty">
                <span className="drinks-table__empty-icon">☕</span>
                <p>No drinks match your filters</p>
              </td>
            </tr>
          ) : (
            drinks.map((drink) => (
              <tr key={drink.id}>
                {/* Thumbnail — fallback to a muted placeholder if no imageUrl */}
                <td className="drinks-table__td--img">
                  {drink.imageUrl ? (
                    <img
                      src={drink.imageUrl}
                      alt={drink.name}
                      className="drinks-table__thumbnail"
                    />
                  ) : (
                    <div className="drinks-table__thumbnail-placeholder" />
                  )}
                </td>

                <td style={{ fontWeight: 500 }}>{drink.name}</td>
                <td>{drink.categoryName}</td>
                <td>{drink.price.toLocaleString()} đ</td>

                {/* Status badge — green for active, red for inactive */}
                <td>
                  <span
                    className={`drinks-table__badge ${
                      drink.active
                        ? "drinks-table__badge--active"
                        : "drinks-table__badge--inactive"
                    }`}
                  >
                    {drink.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{new Date(drink.updatedAt).toLocaleDateString()}</td>

                <td>
                  <button
                    className="drinks-table__edit-btn"
                    onClick={() => onEdit(drink)}
                  >
                    Edit
                  </button>

                  <button
                    className="drinks-table__delete-btn"
                    onClick={() => onDelete(drink)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
