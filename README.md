# Ecommerce Application

This is a MERN stack-based Ecommerce application with user authentication, product management, and a shopping cart system.

## Technologies Used

- **Frontend:** React, React Router, Material UI, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, bcrypt.js
- **Database:** MongoDB (Cloud-based using MongoDB Atlas)

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/ecommerce-app.git
cd ecommerce-app
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 3. Configure Environment Variables
Create a **.env** file inside the **backend** directory:
```sh
MONGODB_URI=mongodb+srv://satya057:satya057@cluster0.a5sw8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=qDX6HOO5W7
PORT=5000
```

### 4. Start the Application
#### Backend
```sh
cd backend
npm start
```
#### Frontend
```sh
cd frontend
npm start
```

---

## API Endpoints

### User Authentication
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login user

### Products
- `GET /products` - Get all products
- `POST /products` - Add a new product (Admin only)

### Cart
- `GET /cart` - Get user cart
- `POST /cart` - Add product to cart

---

## Features
✅ User Authentication (SignUp, Login, JWT-based Authentication)  
✅ Product Management (View, Add to Cart, Checkout)  
✅ Secure API with JWT & Encrypted Passwords  
✅ Responsive UI using Material UI & Tailwind CSS  

### 🚀 Happy Coding! 🎉

