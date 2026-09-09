# E-Commerce Backend

Production-oriented REST API for the E-Commerce Frontend.

## Stack

- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Helmet security headers
- CORS
- Rate limiting
- Centralized error handling

## Features

### Authentication
- Register
- Login
- Current user profile
- JWT protected routes
- Customer/admin roles

### Products
- Paginated product listing
- Search
- Category filtering
- Price range filtering
- Featured and bestseller filters
- Sorting by newest, price, rating, popularity
- Admin create/update/archive

### Orders
- Authenticated checkout/order creation
- Server-side product and stock validation
- Shipping address
- Payment method/status
- Order history
- Admin order management

## API

`GET /api/health`

`POST /api/auth/register`

`POST /api/auth/login`

`GET /api/auth/me` (Bearer token)

`GET /api/products`

`GET /api/products/:id`

`POST /api/products` (admin)

`PATCH /api/products/:id` (admin)

`DELETE /api/products/:id` (admin/archive)

`POST /api/orders` (authenticated)

`GET /api/orders/mine` (authenticated)

`GET /api/orders/mine/:id` (authenticated)

`GET /api/orders/admin/all` (admin)

`PATCH /api/orders/admin/:id` (admin)

## Environment

Copy `.env.example` to `.env` and configure MongoDB, JWT secret, port, and frontend origin.

## Run

```bash
cd backend
npm install
npm run dev
```

Production:

```bash
npm start
```
