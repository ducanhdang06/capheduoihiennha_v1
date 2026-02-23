# Coffee Shop Backend API

A **production-ready RESTful API** built with **Spring Boot** featuring JWT-based authentication, role-based authorization, and a comprehensive drinks management system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Authentication & Authorization](#authentication--authorization)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [DTO Design](#dto-design)
- [Security Architecture](#security-architecture)
- [Configuration](#configuration)
- [Production Readiness](#production-readiness)

---

## 🎯 Overview

This backend implements a secure, stateless authentication system designed for a real-world coffee shop application. It features:

- **JWT-based authentication** with role-based access control
- **Admin-managed user accounts** (no public signup)
- **Comprehensive drinks API** with categories and images
- **Soft and hard delete** support for flexible data management
- **Production-ready security** with externalized configuration

---

## 🛠 Tech Stack

- **Java 17+**
- **Spring Boot** - Application framework
- **Spring Security** - Authentication & authorization
- **JWT (jjwt)** - Stateless token-based auth
- **JPA / Hibernate** - ORM
- **PostgreSQL** - Database (Neon compatible)

---

## 🔐 Authentication & Authorization

### Key Principles

- ✅ **No public signup** - accounts are admin-managed only
- ✅ **No self-service password reset** - admins handle all password changes
- ✅ **Stateless authentication** using JWT tokens
- ✅ **Role-based access control** (RBAC)
- ✅ **Secure password storage** using BCrypt

### User Roles

| Role | Capabilities |
|------|-------------|
| `ADMIN` | Full system access, user management, drinks & category management |
| `MANAGER` | Drinks & category management only |

### JWT Authentication Flow

1. User submits credentials via `POST /api/auth/login`
2. Server validates credentials using Spring Security
3. JWT access token is generated and returned
4. Client includes token in all subsequent requests:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```
5. Server validates token on each request
6. Roles are enforced at endpoint level

### JWT Token Properties

| Property | Value |
|----------|-------|
| **Subject** | Username |
| **Role Claim** | `ROLE_ADMIN` or `ROLE_MANAGER` |
| **Algorithm** | HS256 |
| **Expiration** | Configurable (default: 15 minutes) |

---

## 📡 API Endpoints

### Base URL
```
/api
```

---

### 🔓 Public Endpoints

**Get all active drinks** — returns drinks grouped by category for the menu page
```http
GET /api/drinks
```

**Get single drink**
```http
GET /api/drinks/{id}
```

---

### 🔑 Authentication

**Login**
```http
POST /api/auth/login
```

Request:
```json
{
  "username": "admin",
  "password": "admin"
}
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Get current user info**
```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>
```

Response:
```json
{
  "id": 1,
  "userName": "admin",
  "roleName": "ADMIN"
}
```

---

### 🔐 Admin Endpoints (ADMIN or MANAGER)

> Sorting and searching are handled on the frontend since the menu has ~50 drinks.
> All requests require `Authorization: Bearer <JWT_TOKEN>`.

#### Drinks

**Get all drinks for dashboard**
```http
GET /api/admin/drinks
```

**Get single drink detail**
```http
GET /api/admin/drinks/{id}
```

**Create a drink**
```http
POST /api/admin/drinks
```

```json
{
  "name": "Matcha Latte",
  "description": "Premium matcha...",
  "price": 45000,
  "categoryId": 2,
  "imageUrl": "https://...",
  "active": true
}
```

**Update a drink**
```http
PUT /api/admin/drinks/{id}
```
*(Same request body as POST)*

**Soft delete a drink** — sets `is_active = false`, preserves data
```http
DELETE /api/admin/drinks/{id}
```

**Hard delete a drink** — permanently removes the record
```http
DELETE /api/admin/drinks/{id}/hard
```

#### Categories

**Get all categories**
```http
GET /api/admin/categories
```

**Create a category**
```http
POST /api/admin/categories
```

**Hard delete a category**
```http
DELETE /api/admin/categories/{id}
```

---

### 📊 Endpoint Summary

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/login` | Public | User login |
| `GET` | `/api/auth/me` | Authenticated | Get current user info |
| `GET` | `/api/drinks` | Public | Get all active drinks (menu) |
| `GET` | `/api/drinks/{id}` | Public | Get single drink |
| `GET` | `/api/admin/drinks` | ADMIN/MANAGER | Get all drinks (dashboard) |
| `GET` | `/api/admin/drinks/{id}` | ADMIN/MANAGER | Get drink detail |
| `POST` | `/api/admin/drinks` | ADMIN/MANAGER | Create drink |
| `PUT` | `/api/admin/drinks/{id}` | ADMIN/MANAGER | Update drink |
| `DELETE` | `/api/admin/drinks/{id}` | ADMIN/MANAGER | Soft delete drink |
| `DELETE` | `/api/admin/drinks/{id}/hard` | ADMIN/MANAGER | Hard delete drink |
| `GET` | `/api/admin/categories` | ADMIN/MANAGER | Get all categories |
| `POST` | `/api/admin/categories` | ADMIN/MANAGER | Create category |
| `DELETE` | `/api/admin/categories/{id}` | ADMIN/MANAGER | Hard delete category |

---

## 🗃️ Database Schema

> All table names are plural.

### `drinks`

| Column | Type | Notes |
|--------|------|-------|
| `id` | Integer | Primary key |
| `name` | String | |
| `description` | String | |
| `price` | Integer | |
| `category_id` | Integer | FK → `categories.id` (Many to One) |
| `image_url` | String | |
| `is_active` | Boolean | Used for soft delete |
| `created_at` | DateTime | |
| `updated_at` | DateTime | |

```java
@ManyToOne
@JoinColumn(name = "category_id")
private Category category;
```

### `categories`

| Column | Type | Notes |
|--------|------|-------|
| `id` | Integer | Primary key |
| `name` | String | |
| `drinks` | List\<Drink\> | One to Many |

```java
@OneToMany(mappedBy = "category")
private List<Drink> drinks;
```

### `users`

| Column | Type | Notes |
|--------|------|-------|
| `id` | Long | Primary key |
| `username` | String | |
| `password` | String | BCrypt hash |
| `role` | Role | `ADMIN` or `MANAGER` |
| `is_active` | Boolean | |

---

## 📦 DTO Design

### `AdminDrinkRequest`
Used for creating and updating drinks.

```java
public class AdminDrinkRequest {
    @NotBlank
    private String name;
    private String description;
    @Positive
    private Integer price;
    @NotNull
    private Integer categoryId;
    private String imageUrl;
    private Boolean active;
}
```

### `AdminDrinkListResponse`
Used for the dashboard table — returns only the fields needed for the list view.

```java
public class AdminDrinkListResponse {
    private Integer id;
    private String name;
    private String categoryName;
    private Integer price;
    private Boolean active;
    private LocalDateTime updatedAt;
}
```

### `AdminDrinkDetailResponse`
Used when an admin views a specific drink's full detail.

```java
public class AdminDrinkDetailResponse {
    private Integer id;
    private String name;
    private String description;
    private Integer price;
    private Integer categoryId;
    private String imageUrl;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### `PublicDrinkResponse`
Used for the public menu page.

```java
public class PublicDrinkResponse {
    private Integer id;
    private String name;
    private String description;
    private Integer price;
    private String imageUrl;
    private String categoryName;
}
```

### `CategoryMenuResponse`
Returns a category with its drinks nested inside — used for building the menu grouped by category.

```java
public class CategoryMenuDTO {
    private Integer id;
    private String name;
    private List<PublicDrinkResponse> drinks;
}
```

### `AdminCategoryRequest`

```java
public class AdminCategoryRequest {
    @NotBlank
    private String name;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### `AdminCategoryResponse`

```java
public record AdminCategoryResponse(
    Integer id,
    String name
) {}
```

---

## 🔒 Security Architecture

### Request Flow

```
Request
  → JwtAuthFilter
  → JWT validation
  → SecurityContext populated
  → Role-based authorization
  → Controller
```

### Authorization Rules

| Endpoint Pattern | Access Level |
|-----------------|--------------|
| `/api/auth/login` | Public |
| `GET /api/drinks/**` | Public |
| `/api/auth/me` | Authenticated |
| `POST/PUT/DELETE /api/admin/drinks/**` | ADMIN or MANAGER |
| `GET /api/admin/**` | ADMIN or MANAGER |
| `/api/admin/users/**` | ADMIN only |

### HTTP Status Codes

| Scenario | Status Code |
|----------|-------------|
| Invalid credentials | `401 Unauthorized` |
| Disabled user login | `401 Unauthorized` |
| Missing JWT | `401 Unauthorized` |
| Invalid/expired JWT | `401 Unauthorized` |
| Valid JWT, insufficient role | `403 Forbidden` |
| Validation error | `400 Bad Request` |
| Resource not found | `404 Not Found` |
| Success | `200 OK` / `201 Created` |

---

## ⚙️ Configuration

### Environment Variables

**JWT Configuration:**
```properties
jwt.secret=${JWT_SECRET}
jwt.expiration-ms=${JWT_EXPIRATION_MS:900000}
```

**Database Configuration:**
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
```

### Important Notes

- ⚠️ **`JWT_SECRET` must be set** in production
- `JWT_EXPIRATION_MS` defaults to 15 minutes (900000ms)
- Secrets are **never** stored in code
- All sensitive configuration is externalized

---

## 🚀 Production Readiness

### ✅ Implemented

- ✅ JWT authentication
- ✅ Stateless security architecture
- ✅ Role-based access control (RBAC)
- ✅ Secure password storage (BCrypt)
- ✅ Externalized configuration
- ✅ Proper HTTP status semantics
- ✅ Soft delete + hard delete support
- ✅ DTO layer for clean API/domain separation
- ✅ Category management API

### 🔮 Future Enhancements

- 🔄 Refresh token implementation
- 📝 Comprehensive audit logging
- ⏱️ Rate limiting
- 📚 OpenAPI/Swagger documentation
- 🚀 CI/CD pipeline
- 🧪 Integration test suite

---

## 🧠 Design Decisions

### API Design

- **Drinks are the aggregate root** — all drink-related data accessed through `/api/drinks` and `/api/admin/drinks`
- **Categories are managed resources** — admins can create and delete categories via `/api/admin/categories`
- **Single image per drink** — `imageUrl` is a single string field, simplifying the data model
- **Soft + hard delete** — soft delete preserves data integrity for active menu management; hard delete allows cleanup
- **DTOs throughout** — clear separation between API and domain models
- **Frontend handles sorting/search** — with ~50 drinks, this is simpler and avoids unnecessary backend complexity

### Security Design

- **No role escalation** — users cannot change their own roles
- **No self-service** — admins manage all accounts
- **Stateless authentication** — JWT tokens contain all necessary information
- **Defense in depth** — multiple layers of security validation

---

**Built with ☕ and 🔐**
