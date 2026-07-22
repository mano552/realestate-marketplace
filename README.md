# Real Estate Marketplace (MERN + JWT + Redux Toolkit)

A full-stack real estate listing platform with JWT authentication and five CRUD resources.

**Repo:** https://github.com/mano552/realestate-marketplace
**Live site:** https://realestate-marketplace-sigma.vercel.app
**Backend API:** https://real-estate.bonto.run/api

## Features

- **Auth**: register, login, JWT-protected routes (`/auth/me`, property creation, dashboard, etc.)
- **5 CRUD resources**:
  1. **Properties** — listings with location, category, and price filters
  2. **Categories** — property categories (Apartment, House, Studio, Commercial)
  3. **Reviews** — star ratings + comments per property
  4. **Bookings** — request a visit / view requests you've received
  5. **Favorites** — save/remove properties
- Ownership checks: only the creator of a resource can edit/delete it
- Clean separation: models / controllers / routes (backend), features / pages / components (frontend, RTK Query)
- **Frontend design**: custom design system (forest green + brass accent), animated hero with a
  Ken Burns background and a live stats counter, sticky navbar with Categories/Locations
  dropdowns, hover/transition micro-interactions on cards and buttons, and full mobile
  responsiveness down to small phones
- Seed script to populate demo users, categories, 24 sample properties, and reviews

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Frontend**: React (Vite), Redux Toolkit + RTK Query, React Router
- **Fonts**: Space Grotesk (display), Inter (body), Space Mono (prices/labels)

## Project Structure

This is a single monorepo containing both apps:

```
realestate-marketplace/
  client/                    # React frontend (Vite)
    src/
      app/                    # Redux store + RTK Query base API slice
      features/               # auth, properties, categories, reviews, bookings, favorites
      components/             # Navbar, Footer, Logo, Stats, ProtectedRoute
      pages/                   # Home, Login, Register, Properties, PropertyDetail,
                                # CreateProperty, Categories, Dashboard
    vercel.json               # SPA rewrite so React Router routes don't 404 on refresh

  server/                     # Express API
    config/db.js               # MongoDB connection (forces public DNS servers — see Notes)
    models/                     # User, Property, Category, Review, Booking, Favorite
    controllers/ + routes/      # one pair per resource
    middleware/auth.js          # JWT verification
    seed.js                     # populates demo data
```

## Local Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5000

Optional — populate demo data:
```bash
npm run seed
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5173

Register a user, then explore: browse `/properties`, list one at `/properties/new`,
leave reviews/bookings/favorites on a property detail page, and check `/dashboard`.


---

## Deployment Guide

### Step 1 — Push to GitHub
One repo, both apps:

```bash
cd realestate-marketplace
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/mano552/realestate-marketplace.git
git branch -M main
git push -u origin main
```

### Step 2 — Database: MongoDB Atlas (free)
1. Create a free (M0 / Flex) cluster at https://cloud.mongodb.com
2. **Database Access** → add a database user + password
3. **Network Access** → add `0.0.0.0/0` (Allow Access from Anywhere) — required since hosting
   platforms don't have a fixed IP
4. **Connect → Drivers** → copy the connection string — this is your `MONGO_URI`
5. Append your database name before the `?`, e.g. `.../realestate?retryWrites=true...`
6. Keep this string private — put it only in your local `.env` and in the hosting
   platform's environment variables, never in code or README.

### Step 3 — Backend: Bonto (free, no card required)
1. https://bonto.dev → sign in with GitHub
2. **New App** → import from Git → select this repo
3. Since `package.json` lives inside `server/` (not the repo root), Bonto's importer
   won't find it automatically. After the initial clone, open the app's **Terminal**
   tab and run:
   ```bash
   mv server/* .
   mv server/.env.example . 2>/dev/null
   rm -rf server client
   ```
   This moves the backend files to the root of the running container so Bonto can
   detect `package.json` and start the app. (This only affects the running container,
   not your GitHub repo — for future backend code changes, either edit files directly
   in Bonto's built-in editor and hit Restart, or redo this move after a fresh import.)
4. Add environment variables in **Settings**:
   ```
   MONGO_URI = your Atlas connection string
   JWT_SECRET = a long random string
   JWT_EXPIRES_IN = 7d
   CLIENT_URL = http://localhost:5173   (update in Step 5)
   ```
   Do **not** set a `PORT` variable — let Bonto assign it automatically.
5. Save Settings → Restart → check the **Console** tab for `MongoDB connected`
6. Note your backend URL, e.g. `https://real-estate.bonto.run`

### Step 4 — Frontend: Vercel (free)
1. https://vercel.com → sign up with GitHub
2. **Add New → Project** → import this repo
3. **Root Directory**: `client` (set this in the import screen — important, since this
   is a monorepo)
4. Framework preset: Vite
5. Environment variable:
   ```
   VITE_API_URL = https://real-estate.bonto.run/api
   ```
   Add it as a **Key/Value pair** — don't paste both into one field.
6. Deploy → note your live URL, e.g. `https://realestate-marketplace-sigma.vercel.app`

### Step 5 — Connect them (CORS)
Go back to Bonto → **Settings** → update:
```
CLIENT_URL = https://realestate-marketplace-sigma.vercel.app
```
Save and restart the app.

Your **live URL** is the Vercel link. Your **GitHub repo** is what you pushed in Step 1 —
both required deliverables.


---


## API Reference

| Resource   | Endpoints |
|---|---|
| Auth       | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` 🔒 |
| Properties | `GET /api/properties` (supports `?location=&category=&minPrice=&maxPrice=`), `GET /api/properties/:id`, `GET /api/properties/mine` 🔒, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Categories | `GET /api/categories`, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Reviews    | `GET /api/reviews/property/:propertyId`, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Bookings   | `GET /api/bookings/mine` 🔒, `GET /api/bookings/received` 🔒, `POST` 🔒, `PUT /:id` 🔒, `DELETE /:id` 🔒 |
| Favorites  | `GET /api/favorites` 🔒, `POST` 🔒, `DELETE /:id` 🔒 |

🔒 = requires `Authorization: Bearer <token>` header