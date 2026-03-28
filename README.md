# Contact List App 📇

This repository is a full-stack **contact app** built with PostgreSQL, Express, React, and Node. Users sign up or log in, then create, read, update, and delete contacts that are scoped to their account. Contacts support optional fields such as address, birthday, and notes, and can be marked as favorites via a dedicated patch endpoint. The UI functionality for user sign up, log in, and editing a contact is not complete. 

## Project Stack

- **`frontend/`** — React + Vite app (package name `frontend`), UI with React Bootstrap
- **`backend/`** — Node.js + Express API + PostgreSQL (`pg`), JWT auth (`jsonwebtoken`) and `bcrypt` for passwords

## How to install frontend

1. `cd frontend`
2. `npm install`
3. `npx vite` (or `npm run dev`)
4. Open [http://localhost:5173](http://localhost:5173) in the browser.

Ensure the backend is running and reachable from the app (see [API routes](#api-routes) for the base URL).

## How to install backend + API

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `PORT`, `DATABASE_URL`, and `JWT_SECRET` (see [Database setup](#database-setup) below). `JWT_SECRET` should be a long random string (at least 256 bits of entropy in practice).
4. `npm run dev` (nodemon). The server listens on **`127.0.0.1`** and the port from `PORT` (default **3000** in `.env.example`).

## Database setup

1. Check that PostgreSQL is running.
2. Create an empty database for the app (example name: `contactlistdb`).
3. From the **`backend`** directory, load the schema and seed data (use the database name you created in step 2):

   ```bash
   cd backend
   psql -d your_database -f src/db/db.sql
   ```

4. In **`backend/.env`**, set `DATABASE_URL` to the database connection string—for example:

   ```text
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/your_database
   PORT=3000
   JWT_SECRET=your-long-random-secret
   ```

5. Start the backend with `npm run dev`. If the database is unreachable, the process exits on startup.

## API routes

Base URL (local): `http://127.0.0.1:3000` (or your `PORT`). JSON API routes are mounted under **`/api`**.

Authenticated routes expect a header:

```http
Authorization: Bearer <jwt>
```

Obtain a JWT from **`POST /api/auth/login`** or **`POST /api/auth/signup`**.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | No | Server and PostgreSQL connectivity (not under `/api`). |
| `POST` | `/api/auth/login` | No | Log in. Body: `{ "email", "password" }`. Returns `{ token, user }`. |
| `POST` | `/api/auth/signup` | No | Register. Body: `{ "name", "phone_number", "email", "password" }` (`phone_number` as JSON **number** per current validation). Returns `{ token, user }`. |
| `GET` | `/api/auth/me` | Yes | Current user profile (`id`, `name`, `phone_number`, `email`). |
| `PUT` | `/api/auth/me` | Yes | Update profile. Body: `{ "name", "email", "phone_number" }` (11-digit phone string as validated by the server). |
| `DELETE` | `/api/auth/me` | Yes | Delete the authenticated user (and contacts via DB cascade). |
| `GET` | `/api/contacts` | Yes | All contacts for the logged-in user (includes `owned_by` join). |
| `POST` | `/api/contacts` | Yes | Create contact. Body: `{ "name", "email", "phone_number", "address", "birthday", "notes" }`. **Requires** `name` and `phone_number`; **`phone_number`** must be an **11-digit** string; **`email`** must contain `@`. |
| `GET` | `/api/contacts/:id` | Yes | One contact by id (must belong to the user). |
| `PUT` | `/api/contacts/:id` | Yes | Full update. Same body/validation rules as create. |
| `PATCH` | `/api/contacts/:id` | Yes | Toggle favorite. Body: `{ "is_favorite": true \| false }`. |
| `DELETE` | `/api/contacts/:id` | Yes | Delete one contact. |

CORS is enabled for browser clients.

## How to test

**Backend (automated)**

- `cd backend` — `npm test` is currently a placeholder (no suite wired yet).

**Frontend (automated)**

- `cd frontend` — `npm test` runs **Vitest** (see `ContactForm.test.jsx` and project config).

**Backend (manual)**

1. Health check:

   ```bash
   curl -s http://127.0.0.1:3000/health
   ```

2. Sign up (or log in with a **bcrypt-hashed** account), copy the `token` from the JSON response, then list contacts. **Note:** Rows loaded from `db.sql` use plaintext passwords in the dump; use **`/api/auth/signup`** for a working account, or replace user passwords with hashes before using **`/api/auth/login`**.

   ```bash
   curl -s -X POST http://127.0.0.1:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","phone_number":1234567890,"email":"test@example.com","password":"yourpassword"}'
   ```

   ```bash
   curl -s http://127.0.0.1:3000/api/contacts \
     -H "Authorization: Bearer YOUR_JWT_HERE"
   ```

**Frontend**

- Run the dev server and exercise the UI at `http://localhost:5173`.

## How to use the app

1. **Account** — Register with signup or log in. The API returns a JWT; wire the frontend to store it and send `Authorization: Bearer …` on contact requests (see `AuthContext` and future auth screens if you add them).
2. **Contacts** — Add contacts with name, phone, and email validation aligned with the API (note: the API expects an **11-digit** `phone_number` string for contacts; keep the UI in sync).
3. **Favorites** — Use `PATCH /api/contacts/:id` with `{ "is_favorite": true }` (or `false`) to mark or unmark favorites.
4. **Profile** — Use `GET`/`PUT`/`DELETE` on `/api/auth/me` to read, update, or remove the current account.

**Example `GET /api/contacts` response shape** (array of rows; fields match your SELECT/joins):

```json
[
  {
    "id": "1",
    "name": "Jamie Laney",
    "email": null,
    "phone_number": "333-444-1234",
    "address": "San Francisco, CA",
    "birthday": null,
    "notes": "Gym buddy",
    "is_favorite": false,
    "owned_by": "Amy Lee"
  }
]
```

### Use of AI

This README was generated using ChatGPT using a template from my previous project.
