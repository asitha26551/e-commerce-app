# E-Commerce App

A full-stack e-commerce platform featuring a customer shopping experience and a dedicated admin dashboard for managing products, categories, users, orders, and payments.

## Overview

This project provides an end-to-end online shopping solution that allows customers to browse products, manage carts, complete purchases, and track orders while giving administrators tools to manage the store ecosystem.

## Problem It Solves

The application centralizes online shopping operations by combining customer-facing features and administrative management into a single full-stack system. It simplifies product management, order processing, user management, and payment workflows.

## Main Objectives

- Build a complete customer shopping experience with browsing, cart, checkout, and order tracking.
- Provide an admin dashboard for managing products, categories, users, and orders.
- Implement secure authentication and authorization.
- Integrate online payment workflows.
- Store and manage application data using a structured database system.

## Key Features

### Customer Features
- Product browsing and searching.
- Category, subcategory, product type, and price filtering.
- Product detail pages with image gallery and product variants.
- Shopping cart management.
- Checkout process with payment options.
- Order history and order tracking.
- User profile management.

### Admin Features
- Admin dashboard for store management.
- Product creation, updating, and deletion.
- Category, subcategory, and product type management.
- Order management and status updates.
- User management.
- Product image uploads and media handling.

### Additional Features
- Best-selling product support.
- Cloud-based image storage.
- JWT-based authentication.
- Stripe payment integration.
- Responsive user interfaces.

## Technologies Used

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- CORS
- Dotenv

### Integrations & Tools
- Stripe Payments
- Cloudinary
- Razorpay (dependency configured)
- Git
- ESLint
- PostCSS
- Vercel Deployment

## System Architecture

The application follows a separated frontend and backend architecture:

```
E-Commerce App
│
├── client-frontend
│   └── Customer shopping application
│
├── admin-frontend
│   └── Admin management dashboard
│
└── backend
    └── REST API server
```

### Backend API Modules

- User Management
- Product Management
- Category Management
- Subcategory Management
- Product Type Management
- Cart Management
- Order Management
- Payment Processing

## Database

**MongoDB** is used as the primary database with **Mongoose** for object modeling.

The database stores:

- Users
- Products
- Categories
- Shopping carts
- Orders
- Product information

## Authentication & Security

- JWT-based authentication.
- Separate authentication middleware for users and administrators.
- Protected user profile and account operations.
- Role-based access control for admin features.
- Secure password handling using bcrypt.

## APIs & Integrations

Implemented APIs include:

- User registration and authentication.
- User profile management.
- Product listing and management.
- Category and product hierarchy management.
- Shopping cart operations.
- Order creation and tracking.
- Payment processing with Stripe.
- Product image management using Cloudinary.

## Challenges Solved

- Designed a role-based system for customers and administrators.
- Created a scalable product categorization structure.
- Implemented secure authentication workflows.
- Integrated third-party payment services.
- Managed product media uploads and storage.
- Developed persistent cart and order management systems.

## Skills Demonstrated

- Full-stack web development.
- REST API development.
- Frontend architecture design.
- Backend API design.
- Authentication and authorization.
- Database modeling.
- Payment gateway integration.
- Cloud media management.
- Admin dashboard development.
- Deployment configuration.

## Installation & Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run server
```

### Customer Frontend

```bash
cd client-frontend
npm install
npm run dev
```

### Admin Frontend

```bash
cd admin-frontend
npm install
npm run dev
```

## Project Highlights

- Complete full-stack e-commerce workflow.
- Separate customer and admin applications.
- Secure authentication system.
- Real-world payment integration.
- Cloud-based product image management.
- Scalable REST API architecture.
