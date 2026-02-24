export default function DrinkFilters({ filters, setFilters, categories }) {
  return (
    <div className="dashboard-filters">
      {/* 🔎 Search */}
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />

      {/* 📂 Category */}
      <select
        value={filters.categoryId}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            categoryId: e.target.value,
          }))
        }
      >
        <option value="all">Tất cả loại</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* 🔘 Status */}
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, status: e.target.value }))
        }
      >
        <option value="all">Tất cả trạng thái</option>
        <option value="active">Đang bán</option>
        <option value="inactive">Ngừng bán</option>
      </select>

      {/* 💰 Sort */}
      <select
        value={filters.sort}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, sort: e.target.value }))
        }
      >
        <option value="none">Sắp xếp</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
        <option value="new-to-old">Mới Nhất</option>
        <option value="old-to-new">Cũ Nhất</option>
      </select>
    </div>
  );
}
