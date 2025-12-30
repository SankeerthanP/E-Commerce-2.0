# MERN E-Commerce Website

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js (MERN stack).

## Features

- **User Authentication**: Login/Register for users and admins
- **Product Catalog**: Browse products by category with search and filters
- **Shopping Cart**: Add products to cart and checkout
- **Order Management**: Track order status (Placed → Shipped → Delivered)
- **Admin Dashboard**: Manage products, orders, and view feedback
- **Reviews & Ratings**: Users can rate and review products
- **Feedback System**: Submit feedback visible to admins

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

## Installation & Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Environment Variables

The `.env` files have been created:
- `backend/.env` - Contains MongoDB URI and JWT secret
- `frontend/.env` - Contains API URL

### 4. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If MongoDB is installed as a service, it should already be running
# Otherwise, start it manually
mongod
```

### 5. Seed Initial Data (Optional but Recommended)

Create an admin user and sample categories/products:

```bash
cd backend
node seed.js
```

This will create:
- An admin user (email: `admin@example.com`, password: `admin123`)
- 10 categories with 6 products each (60 products total)

### 6. Run the Application

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173` (or the port Vite assigns)

### 7. Access the Application

- **Frontend**: Open `http://localhost:5173` in your browser
- **Backend API**: `http://localhost:5000/api`

## Default Admin Credentials

After running the seed script:
- **Email**: `admin@example.com`
- **Password**: `admin123`

⚠️ **Important**: Change the admin password after first login!

## Manual Admin User Creation

If you don't run the seed script, you can create an admin user manually:

1. Register a normal user through the frontend
2. Open MongoDB Compass or use mongo shell
3. Find the user in the `users` collection
4. Update the `role` field to `"admin"`

Or use this MongoDB command:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Project Structure

```
E-Commerce 2.0/
├── backend/
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Auth middleware
│   ├── server.js           # Express server
│   ├── seed.js             # Seed script (optional)
│   └── .env                # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── context/        # React contexts (Auth, Cart)
    │   ├── services/       # API client
    │   └── App.jsx         # Main app component
    └── .env                # Environment variables
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/products` - List products (with filters)
- `GET /api/products/:slug` - Get product details
- `POST /api/orders` - Create order (user)
- `GET /api/orders/my` - Get user orders
- `POST /api/reviews` - Add review (user)
- `GET /api/reviews/product/:productId` - Get product reviews
- Admin routes require admin role

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod` or check MongoDB service
- Verify the URI in `backend/.env` matches your MongoDB setup

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically use the next available port

### CORS Issues
- Backend CORS is configured to allow all origins in development
- Make sure frontend `.env` has the correct `VITE_API_URL`

## License

ISC


