# Real Estate Marketplace (MERN + JWT + Redux Toolkit)

A full-stack real estate listing platform with JWT authentication and five CRUD resources.

## Features

- **Auth**: register, login, JWT-protected routes (`/auth/me`, property creation, dashboard, etc.)
- **5 CRUD resources**:
  1. **Properties** — listings with location/price filters
  2. **Categories** — property categories
  3. **Reviews** — star ratings + comments per property
  4. **Bookings** — request a visit / view requests you've received
  5. **Favorites** — save/remove properties
- Ownership checks: only the creator of a resource can edit/delete it
- Clean separation: models / controllers / routes (backend), features / pages / components (frontend, RTK Query)

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Frontend**: React (Vite), Redux Toolkit + RTK Query, React Router

## Project Structure

```
project/
  server/     # Express API
  client/     # React app
```

## Local Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI (see MongoDB Atlas below) and JWT_SECRET
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```
Runs on http://localhost:5173

Register a user, then explore: browse `/properties`, list one at `/properties/new`,
leave reviews/bookings/favorites on a property detail page, and check `/dashboard`.

---



### Step 1 — Push to GitHub
```bash
cd project
git init
git add .
git commit -m "Initial commit: MERN real estate marketplace"
gh repo create realestate-marketplace --public --source=. --push
# or create a repo on github.com and:
# git remote add origin <your-repo-url>
# git push -u origin main
```

### Step 2 — Database: MongoDB Atlas (free)
1. Create a free cluster at https://cloud.mongodb.com
2. Database Access → add a user + password
3. Network Access → allow `0.0.0.0/0` (or Render's IPs)
4. Get your connection string (Connect → Drivers) — this is your `MONGO_URI`

### Step 3 — Backend: Render (free)
1. https://render.com → New → Web Service → connect your GitHub repo
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN=7d`, `CLIENT_URL` (fill in after step 4)
6. Deploy → note the URL, e.g. `https://realestate-api.onrender.com`

### Step 4 — Frontend: Vercel (free)
1. https://vercel.com → New Project → import the same repo
2. Root directory: `client`
3. Framework preset: Vite
4. Environment variable: `VITE_API_URL=https://realestate-api.onrender.com/api`
5. Deploy → note the URL, e.g. `https://realestate-marketplace.vercel.app`

### Step 5 — Connect them
Go back to Render → update `CLIENT_URL` to your Vercel URL → redeploy the backend
(this makes CORS accept requests from your live frontend).

Your **live URL** is the Vercel link. Your **GitHub repo** is what you pushed in Step 1 — both required deliverables.

---

## API Reference (quick)

| Resource   | Endpoints |
|---|---|
| Auth       | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` 🔒 |
| Properties | `GET /api/properties`, `GET /api/properties/:id`, `GET /api/properties/mine` 🔒, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Categories | `GET /api/categories`, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Reviews    | `GET /api/reviews/property/:propertyId`, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Bookings   | `GET /api/bookings/mine` 🔒, `GET /api/bookings/received` 🔒, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Favorites  | `GET /api/favorites` 🔒, `POST` 🔒, `DELETE /:id` 🔒 |

🔒 = requires `Authorization: Bearer <token>` header
