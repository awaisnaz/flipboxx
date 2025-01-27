# Ecommerce Application

### Table of Contents
1. [General Overview](#general-overview)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Frontend UI](#frontend-ui)
5. [Backend API Documentation](#backend-api-documentation)
6. [Database Overview](#database-overview)

### General Overview
This application aims to address the $900 billion issue of e-commerce returns. These returns often consist of unboxed items that are new and still under warranty, but customers choose to return them within the return period. The logistics involved in processing these returns are expensive, leading retailers to either instruct customers to keep the items (bearing the loss themselves) or send the items back to warehouses where they are auctioned off, incurring additional logistics, management, and third-party fees.

Our solution helps retailers lower their costs by redirecting returned items directly to new customers at a discounted price, bypassing the warehouse entirely. This approach benefits all parties involved:
- **Retailers** remain profitable by selling discounted, unboxed secondhand items.
- **First Customers** can forward the items without incurring any loss.
- **New Customers** receive quality products at a discounted rate.

In the future, we plan to expand this solution to include second-hand products as well.

### Getting Started
To run the application locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required environment variables (see below)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

#### Deployment to Vercel (Browser Method)
1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and log in
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings (if needed)
6. Click "Deploy"
7. Your application will be live at the provided Vercel URL

### Environment Variables
The following environment variables are required in the `.env` file:

- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `APP_URL`
- `MONGODB_URL`
- `BLOB_READ_WRITE_TOKEN`
- `NEXT_PUBLIC_VERCEL_URL`
- `NEXT_PUBLIC_BASE_URL`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_RECEIVER`
- `DEEPSEEK_R1`
- `OPENROUTER`

### Frontend UI
The application consists of two main interfaces:

#### Customer Application
- Homepage: `/`
- Product Listings: `/products`
- Product Details: `/products/:id`
- Shopping Cart: `/cart`
- Checkout: `/checkout`
- User Profile: `/profile`
- Order History: `/orders`

#### Retailer Application
- Dashboard: `/dashboard`
  - This is the main interface for retailers to manage their products and orders
  - All other routes are part of the customer application

### Backend API Documentation

#### Authentication API
- **Endpoint**: `/api/auth/[...nextauth]`
- **Method**: POST
- **Description**: Handles user authentication using NextAuth.js
- **Responses**:
  - 200: Authentication successful
  - 401: Unauthorized
  - 500: Server error

#### Cart API Endpoints

##### 1. Add Product to Cart
- **Endpoint**: `/api/carts/addProduct`
- **Method**: POST
- **Parameters**:
  - `customerId` (string, required)
  - `productId` (string, required)
- **Responses**:
  - 201: Product added successfully
  - 400: Missing parameters
  - 409: Product already exists
  - 500: Server error

##### 2. Get Products in Cart
- **Endpoint**: `/api/carts/getProducts`
- **Method**: GET
- **Parameters**:
  - `customerId` (string, required)
- **Responses**:
  - 200: Returns list of products in cart
  - 400: Missing parameters
  - 404: Cart not found
  - 500: Server error

##### 3. Remove Product from Cart
- **Endpoint**: `/api/carts/removeProduct`
- **Method**: DELETE
- **Parameters**:
  - `customerId` (string, required)
  - `productId` (string, required)
- **Responses**:
  - 200: Product removed successfully
  - 400: Missing parameters
  - 404: Product not found in cart
  - 500: Server error

#### Customer API
- **Endpoint**: `/api/customers/getCustomerIdByEmail`
- **Method**: GET
- **Parameters**:
  - `email` (string, required)
- **Responses**:
  - 200: Returns customer ID
  - 400: Missing parameters
  - 404: Customer not found
  - 500: Server error

#### Help API
- **Endpoint**: `/api/help`
- **Method**: POST
- **Description**: Handles help requests from users
- **Responses**:
  - 200: Help request received
  - 400: Invalid request
  - 500: Server error

#### Order API
- **Endpoint**: `/api/orders/getOrdersByCustomerId`
- **Method**: GET
- **Parameters**:
  - `customerId` (string, required)
- **Responses**:
  - 200: Returns list of orders
  - 400: Missing parameters
  - 404: No orders found
  - 500: Server error

#### Product APIs

##### 1. Main Products Endpoint
- **Endpoint**: `/api/products`
- **Method**: GET
- **Responses**:
  - 200: Returns list of all products
  - 500: Server error

##### 2. Get Product Details
- **Endpoint**: `/api/products/getProduct`
- **Method**: GET
- **Parameters**:
  - `productId` (string, required)
- **Responses**:
  - 200: Returns product details
  - 400: Missing parameters
