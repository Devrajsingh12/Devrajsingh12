# 🙏 Pandit Ji Booking App - Full Stack MERN Application

A comprehensive full-stack web application for booking Pandit services and purchasing holy items, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### 🔐 Authentication
- **JWT-based authentication** with role-based access control
- **Dual login system** for Users and Pandits
- **Secure password hashing** with bcryptjs
- **Social login UI** (Facebook, Google, Twitter - UI only)

### 👨‍🎓 Pandit Services
- **Browse verified Pandits** with ratings and experience
- **Easy booking system** with date, time, and location selection
- **Service management** for different ceremonies (Griha Pravesh, Marriage, Havan, etc.)
- **Real-time booking status** updates

### 🛍️ Holy Items Shop
- **Complete product catalog** with categories (Puja Items, Incense, Books, etc.)
- **Advanced filtering** by category and search functionality
- **Shopping cart management** with add/remove/update functionality
- **Inventory tracking** with stock management

### 📱 User Experience
- **Responsive design** with mobile-first approach
- **Modern UI** with Tailwind CSS styling
- **Hamburger navigation** for mobile devices
- **Intuitive user dashboards** for both Users and Pandits

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pandit-ji-booking-app
```

### 2. Install Dependencies

#### Install root dependencies
```bash
npm install
```

#### Install server dependencies
```bash
npm run install-server
```

#### Install client dependencies
```bash
npm run install-client
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/panditji_booking
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

### 4. Database Setup

Make sure MongoDB is running on your system. The application will create the necessary collections automatically.

#### Initialize Sample Products (Optional)
Once the server is running, you can initialize sample products by making a POST request to:
```
POST http://localhost:5000/api/shop/init-products
```

## 🚀 Running the Application

### Development Mode (Recommended)
Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Individual Services

#### Run Backend Only
```bash
npm run server
```

#### Run Frontend Only
```bash
npm run client
```

### Production Build
```bash
npm run build
npm start
```

## 📖 Usage Guide

### 1. User Registration & Login
- Visit `http://localhost:3000`
- Click "Register" to create a new account
- Choose between "User" or "Pandit" account type
- Login with your credentials

### 2. Demo Accounts
For testing purposes, you can use these demo credentials:
- **User Account**: `user@demo.com` / `password123`
- **Pandit Account**: `pandit@demo.com` / `password123`

### 3. Booking a Pandit
- Navigate to "Book Pandit" from the menu
- Browse available Pandits and their profiles
- Select a Pandit and fill in the booking details
- Submit your booking request

### 4. Shopping for Holy Items
- Visit the "Shop" section
- Browse products by category or use search
- Add items to your cart
- Proceed to checkout (requires login)

### 5. Managing Your Account
- Access your dashboard from the user menu
- View booking history and order status
- Update your profile information

## 🏗️ Project Structure

```
pandit-ji-booking-app/
├── package.json                 # Root package.json with scripts
├── README.md                    # Project documentation
├── server/                      # Backend Express application
│   ├── package.json
│   ├── server.js               # Main server file
│   ├── .env                    # Environment variables
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/                 # Mongoose models
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Product.js
│   │   └── Order.js
│   └── routes/                 # API routes
│       ├── auth.js
│       ├── users.js
│       ├── bookings.js
│       ├── shop.js
│       └── orders.js
└── client/                      # Frontend React application
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
        ├── App.tsx             # Main App component
        ├── App.css             # Global styles
        ├── components/         # Reusable components
        │   └── Navbar.tsx
        ├── context/            # React Context providers
        │   ├── AuthContext.tsx
        │   └── CartContext.tsx
        └── pages/              # Page components
            ├── Home.tsx
            ├── Login.tsx
            ├── Register.tsx
            ├── Booking.tsx
            ├── Shop.tsx
            ├── Cart.tsx
            ├── Orders.tsx
            ├── UserDashboard.tsx
            ├── PanditDashboard.tsx
            └── Features.tsx
```

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User Routes
- `GET /api/users/pandits` - Get all Pandits
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/profile/:id` - Get user profile by ID

### Booking Routes
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `PUT /api/bookings/:id/status` - Update booking status
- `GET /api/bookings/:id` - Get booking by ID

### Shop Routes
- `GET /api/shop/products` - Get all products
- `GET /api/shop/products/:id` - Get product by ID
- `GET /api/shop/categories` - Get product categories
- `POST /api/shop/init-products` - Initialize sample products

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

## 🎨 Features Overview

### Navigation
- **Responsive navbar** with hamburger menu for mobile
- **Role-based menu items** (different for Users vs Pandits)
- **Cart indicator** showing item count
- **User greeting** and logout functionality

### Authentication System
- **JWT tokens** for secure authentication
- **Role-based access control** (User vs Pandit)
- **Protected routes** requiring login
- **Persistent login** with token storage

### Shopping Experience
- **Product categorization** and filtering
- **Search functionality** across products
- **Shopping cart** with quantity management
- **Checkout process** with address collection

### Booking System
- **Pandit profiles** with ratings and experience
- **Service selection** from predefined options
- **Date and time picker** for appointments
- **Location specification** for ceremonies

## 🚧 Future Enhancements

- [ ] **Real payment integration** (Stripe/PayPal)
- [ ] **Email notifications** for bookings and orders
- [ ] **Advanced dashboard features** with analytics
- [ ] **Review and rating system** for completed services
- [ ] **Real-time chat** between users and Pandits
- [ ] **Mobile app** with React Native
- [ ] **Advanced search filters** and sorting options
- [ ] **Wishlist functionality** for products

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Built with ❤️ for the spiritual community** 🙏
