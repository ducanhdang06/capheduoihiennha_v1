# Coffee Shop Backend API

A **production-ready RESTful API** built with **Spring Boot** featuring JWT-based authentication, role-based authorization, and a comprehensive drinks management system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Authentication & Authorization](#authentication--authorization)
- [API Endpoints](#api-endpoints)
- [Security Architecture](#security-architecture)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Production Readiness](#production-readiness)

---

## 🎯 Overview

This backend implements a secure, stateless authentication system designed for a real-world coffee shop application. It features:

- **JWT-based authentication** with role-based access control
- **Admin-managed user accounts** (no public signup)
- **Comprehensive drinks API** with categories, tags, and images
- **Soft delete pattern** for data integrity
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
| `ADMIN` | Full system access, user management, drinks management |
| `MANAGER` | Drinks management only (create, update, delete drinks) |

### JWT Authentication Flow

1. User submits credentials via `/api/auth/login`
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

### 🔑 Authentication

#### Login
```http
POST /api/auth/login
```

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### ☕ Drinks API

#### 🔓 Public Endpoints

**Get all active drinks**
```http
GET /api/drinks
```

Optional query parameters:
```http
GET /api/drinks?categoryId=1
GET /api/drinks?tag=hot
GET /api/drinks?categoryId=1&tag=iced
```

**Get single drink**
```http
GET /api/drinks/{id}
```

#### 🔐 Protected Endpoints (ADMIN or MANAGER)

**Create drink**
```http
POST /api/drinks
Authorization: Bearer <JWT_TOKEN>
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

**Update drink**
```http
PUT /api/drinks/{id}
Authorization: Bearer <JWT_TOKEN>
```

**Soft delete drink**
```http
DELETE /api/drinks/{id}
Authorization: Bearer <JWT_TOKEN>
```
*Note: Sets `is_active = false`, preserving data integrity*

---

### 🗂 Categories API

#### Get all categories
```http
GET /api/categories
```

**Response:** All available drink categories

---

### 🧑‍💼 Admin User Management (ADMIN only)

**Create MANAGER account**
```http
POST /api/admin/users
Authorization: Bearer <JWT_TOKEN>
```

**Request body:**
```json
{
  "username": "manager1",
  "password": "temp123",
  "role": "MANAGER"
}
```

**Reset user password**
```http
PATCH /api/admin/users/{id}/password
Authorization: Bearer <JWT_TOKEN>
```

**Request body:**
```json
{
  "newPassword": "newPassword123"
}
```

**Disable/enable user**
```http
PATCH /api/admin/users/{id}/disable?disabled=true
Authorization: Bearer <JWT_TOKEN>
```

---

### 📊 Endpoint Summary

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/login` | Public | User login |
| `GET` | `/api/drinks` | Public | Get all active drinks |
| `GET` | `/api/drinks/{id}` | Public | Get single drink |
| `POST` | `/api/drinks` | ADMIN/MANAGER | Create new drink |
| `PUT` | `/api/drinks/{id}` | ADMIN/MANAGER | Update drink |
| `DELETE` | `/api/drinks/{id}` | ADMIN/MANAGER | Soft delete drink |
| `GET` | `/api/categories` | Public | Get all categories |
| `POST` | `/api/admin/users` | ADMIN | Create user |
| `PATCH` | `/api/admin/users/{id}/password` | ADMIN | Reset password |
| `PATCH` | `/api/admin/users/{id}/disable` | ADMIN | Disable/enable user |

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
| `/api/auth/**` | Public |
| `GET /api/drinks/**` | Public |
| `POST/PUT/DELETE /api/drinks/**` | ADMIN or MANAGER |
| `/api/admin/**` | ADMIN only |
| All others | Authenticated |

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

## 🗃️ Database Setup

### Initial Admin User

The system does not auto-create users. An initial ADMIN must be created manually:

```sql
INSERT INTO users (username, password, role, active)
VALUES ('admin', '$2a$10$...', 'ADMIN', true);
```

*Note: Password must be a BCrypt hash*

### Database Hosting

- Compatible with hosted PostgreSQL (e.g., Neon, AWS RDS)
- Connection configured via environment variables
- All user management after initial setup is via secure APIs

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
- ✅ Admin user lifecycle management
- ✅ Secure password storage (BCrypt)
- ✅ Externalized configuration
- ✅ Proper HTTP status semantics
- ✅ Soft delete pattern
- ✅ DTO layer for clean separation

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

- **Drinks are the aggregate root** - all drink-related data accessed through `/api/drinks`
- **Categories are reference data** - simple lookup resource
- **Tags and images are sub-resources** - managed through drinks, no separate endpoints
- **Soft deletes preserve data** - nothing is permanently removed
- **DTOs throughout** - clear separation between API and domain models

### Security Design

- **No hard delete** - maintains audit trail
- **No role escalation** - users cannot change their own roles
- **No self-service** - admins manage all accounts
- **Stateless authentication** - JWT tokens contain all necessary information
- **Defense in depth** - multiple layers of security validation

---

## 📞 Support

For issues or questions about this API, please contact the development team.

---

**Built with ☕ and 🔐**
