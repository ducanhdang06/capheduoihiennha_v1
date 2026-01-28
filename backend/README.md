# 📡 API Endpoints

## Base URL
```
/api
```

---

## ☕ Drinks API (Core Resource)

### 🔓 Public Endpoints

#### Get all active drinks
```http
GET /api/drinks
```

**Optional query parameters:**
```http
GET /api/drinks?categoryId=1
GET /api/drinks?tag=hot
GET /api/drinks?categoryId=1&tag=iced
```

**Response:** List of active drinks with category, tags, and images.

---

#### Get a single drink by ID
```http
GET /api/drinks/{id}
```

**Response:** Full details for one drink.

---

### 🔐 Admin Endpoints

#### Create a new drink
```http
POST /api/drinks
```

**Request body:**
```json
{
  "name": "Latte",
  "description": "Smooth espresso with milk",
  "price": 450,
  "categoryId": 1,
  "tags": ["hot", "popular"],
  "images": ["latte1.jpg", "latte2.jpg"]
}
```

---

#### Update an existing drink
```http
PUT /api/drinks/{id}
```

**Request body:** Same as `POST /api/drinks`

---

#### Soft delete a drink
```http
DELETE /api/drinks/{id}
```

**Effect:** Marks the drink as inactive (`is_active = false`). The drink will no longer appear in public queries.

---

## 🗂 Categories API

#### Get all categories
```http
GET /api/categories
```

**Response:** All available drink categories.

**Use case:** Menu filtering and admin selection.

---

## 🚫 Endpoints Not Exposed (By Design)

The following resources are managed internally and do not have standalone APIs:

- `/api/tags`
- `/api/images`
- `/api/drink-tags`
- `/api/categories/{id}/drinks`

**Reason:** Tags and images are handled as sub-resources of drinks.

---

## 📋 Endpoint Summary

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/drinks` | Public | Get all active drinks |
| `GET` | `/api/drinks/{id}` | Public | Get single drink |
| `POST` | `/api/drinks` | Admin | Create new drink |
| `PUT` | `/api/drinks/{id}` | Admin | Update drink |
| `DELETE` | `/api/drinks/{id}` | Admin | Soft delete drink |
| `GET` | `/api/categories` | Public | Get all categories |

---

## 🧠 Design Notes

- **Drinks are the aggregate root** — all drink-related data is accessed through the drinks endpoint
- **Categories are reference data** — simple lookup resource
- **Tags and images are managed through drinks** — no separate endpoints
- **Soft deletes are used** — data is never permanently removed
- **DTOs are used** — clear separation between request/response and domain models


POST   /api/admin/users              → create MANAGER
PATCH  /api/admin/users/{id}/password → reset password
PATCH  /api/admin/users/{id}/disable  → disable / enable
