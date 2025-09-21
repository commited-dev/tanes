# TANES - Template API NodeJS Express Swagger

A simple **Node.js + Express + TypeScript** REST API with **role-based authentication**, **JWT security**, and **Swagger documentation**.  
Built with MongoDB (Mongoose) and designed for extensibility.

## Live Demo

- Here you can check how the swagger will gone look like -> https://tanes.onrender.com/api-docs/

**How it works**

- 1. Register as new user
- 2. Login
- 3. Copy the token and paste it into "Authorization" that is placed in top right corner

**NOTE** - because it's deployed on a free tier on render for demo purposes, after you click the link you will need to wait couple minutes until the server is starting.

---

## 🚀 Features

- 🔑 **Authentication & Authorization**
  - Register & login with JWT
  - Role-based access control (`user`, `moderator`, `admin`)
- 👤 **User Management**
  - Get all users (admin only)
  - Get, update, delete user by ID
  - Get current user (`/auth/me` or `/users/me`)
- 📝 **Posts**
  - CRUD for posts
  - Permissions enforced (users manage their own posts, admins/mods can manage all)
- ⚡ **Middleware**
  - Centralized error handling
  - Authentication & role-based authorization
- 📖 **API Docs**
  - Swagger UI available at `/api-docs`

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT (jsonwebtoken)** for auth
- **Swagger (swagger-jsdoc + swagger-ui-express)**
- **dotenv** for environment management

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/commited-dev/tanes
cd tanes

# Install dependencies
npm install

# Setup environment variables
cp .env.develop.local
```

Update `.env.develop.local` with your values:

```env
PORT=5500
MONGODB_URI=mongodb://localhost:27017/tanes
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1d
SERVER_URL=http://localhost:5500
```

---

## ▶️ Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

---

## 📚 API Documentation

Swagger UI available at:

- Local: [http://localhost:5500/api-docs](http://localhost:5500/api-docs)
- Production (Render): `https://tanes.onrender.com/api-docs`

---

## 🔐 Authentication

Most routes require a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## 📌 Endpoints (Summary)

### Auth

- `POST /api/v1/auth/register` → Register new user
- `POST /api/v1/auth/login` → Login and receive JWT
- `GET /api/v1/auth/me` → Get current authenticated user

### Users

- `GET /api/v1/users` → Get all users (**admin only**)
- `GET /api/v1/users/{id}` → Get user by ID
- `PUT /api/v1/users/{id}` → Update user (self or admin)
- `DELETE /api/v1/users/{id}` → Delete user (**admin only**)
- `GET /api/v1/users/me` → Get current user

### Posts

- `GET /api/v1/posts` → Get all posts
- `POST /api/v1/posts` → Create a new post
- `GET /api/v1/posts/{id}` → Get a post by ID
- `PUT /api/v1/posts/{id}` → Update post (owner, admin, moderator)
- `DELETE /api/v1/posts/{id}` → Delete post (owner, admin, moderator)

---

## 🛡️ Error Handling

All errors return a standardized JSON:

```json
{
  "success": false,
  "error": "Message describing the error"
}
```

Global error responses are documented in Swagger (`#/components/responses`).

---

## 🧩 Folder Structure

```
src/
 ├─ config/          # Env config
 ├─ controllers/     # Route controllers
 ├─ docs/            # Swagger JSDoc definitions
 ├─ middlewares/     # Auth & error handling
 ├─ models/          # Mongoose models
 ├─ routes/          # Express routers
 ├─ swagger.ts       # Swagger setup
 ├─ app.ts           # Express app
 └─ server.ts        # Entry point
```

---

## 📖 License

MIT
