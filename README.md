# 🙏 Pandit Ji Booking App

A full-stack MERN application for booking qualified Pandits and purchasing authentic holy items. This beginner-to-intermediate level project demonstrates modern web development practices with JavaScript.

## 🎯 Features

### 👤 User Features
- **Authentication**: Secure JWT-based login/register for Users and Pandits
- **Book Pandit Services**: Browse and book qualified Pandits for various ceremonies
- **Holy Items Shop**: Purchase authentic puja items with cart functionality
- **Order Management**: Track orders and booking history
- **Profile Management**: Update personal information and preferences

### 🔱 Pandit Features
- **Service Management**: Manage booking requests and availability
- **Profile Setup**: Showcase expertise, experience, and contact details
- **Booking Dashboard**: Accept/reject booking requests
- **Ratings & Reviews**: Build reputation through customer feedback

### 🛍️ E-commerce Features
- **Product Catalog**: Browse holy items by category with search and filters
- **Shopping Cart**: Add/remove items with quantity management
- **Secure Checkout**: Complete purchase with shipping details
- **Order Tracking**: Monitor order status and delivery

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
pandit-ji-booking-app/
├── backend/
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User/Pandit model
│   │   ├── Booking.js       # Booking model
│   │   ├── Product.js       # Product model
│   │   └── Order.js         # Order model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── bookings.js      # Booking management routes
│   │   ├── products.js      # Product catalog routes
│   │   └── orders.js        # Order management routes
│   ├── .env                 # Environment variables
│   ├── server.js            # Express server setup
│   ├── seed.js              # Database seeding script
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer components
│   │   │   └── common/      # Reusable components
│   │   ├── context/
│   │   │   ├── AuthContext.js    # Authentication state
│   │   │   └── CartContext.js    # Shopping cart state
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Shop.js           # Product catalog
│   │   │   ├── Cart.js           # Shopping cart
│   │   │   ├── Booking.js        # Pandit booking
│   │   │   ├── Orders.js         # Order history
│   │   │   └── dashboard/        # User/Pandit dashboards
│   │   ├── utils/
│   │   │   └── api.js            # Axios configuration
│   │   ├── App.js               # Main App component
│   │   └── index.css            # Tailwind styles
│   ├── tailwind.config.js
│   └── package.json
├── package.json             # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pandit-ji-booking-app
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (backend + frontend)
   npm run install-deps
   
   # Or install manually
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pandit-ji-booking
   JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
   JWT_EXPIRE=30d
   ```

4. **Database Setup**
   
   Start MongoDB service and seed the database:
   ```bash
   # Make sure MongoDB is running
   # Then seed the database with sample data
   cd backend
   node seed.js
   ```

5. **Start the application**
   ```bash
   # From root directory - starts both backend and frontend
   npm run dev
   
   # Or start individually
   npm run server  # Backend only (port 5000)
   npm run client  # Frontend only (port 3000)
   ```

## 🔐 Sample Login Credentials

After running the seed script, you can use these credentials:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| User | user@panditji.com | user123 | Regular user account |
| Pandit | rajesh@panditji.com | pandit123 | Experienced Pandit |
| Pandit | vikram@panditji.com | pandit123 | Astrology specialist |
| Admin | admin@panditji.com | admin123 | Admin user |

## 📱 Pages & Routes

### Public Routes
- `/` - Home page with features and services
- `/login` - Login for Users and Pandits
- `/register` - Registration with role selection
- `/shop` - Browse holy items (guest access)
- `/features` - App features and services

### Protected Routes
- `/booking` - Book Pandit services (Users only)
- `/cart` - Shopping cart management
- `/orders` - Order history and tracking
- `/dashboard/user` - User profile and bookings
- `/dashboard/pandit` - Pandit dashboard and requests

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register     # Register new user/pandit
POST /api/auth/login        # Login user/pandit
GET  /api/auth/me          # Get current user
PUT  /api/auth/profile     # Update profile
```

### Bookings
```
GET  /api/bookings/pandits     # Get available pandits
POST /api/bookings             # Create booking (users)
GET  /api/bookings/my-bookings # User's bookings
GET  /api/bookings/requests    # Pandit's requests
PUT  /api/bookings/:id/status  # Update booking status
```

### Products
```
GET  /api/products             # Get all products
GET  /api/products/:id         # Get single product
GET  /api/products/categories/list  # Get categories
GET  /api/products/featured/list    # Get featured products
```

### Orders
```
POST /api/orders               # Create order
GET  /api/orders/my-orders     # User's orders
GET  /api/orders/:id           # Get single order
PUT  /api/orders/:id/payment   # Update payment status
```

## 🎨 UI Components

### Tailwind CSS Classes
- `btn-primary` - Primary button styling
- `btn-secondary` - Secondary button styling
- `btn-outline` - Outlined button styling
- `input-field` - Form input styling
- `card` - Card container styling
- `badge-*` - Status badge variations

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Grid layouts that adapt to screen sizes
- Touch-friendly buttons and interactions

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **Role-based Access** - Different permissions for users/pandits
- **Input Validation** - Server-side validation with express-validator
- **CORS Protection** - Configured for secure cross-origin requests

## 🛠️ Development Scripts

```bash
# Root level scripts
npm run dev           # Start both backend and frontend
npm run server        # Start backend only
npm run client        # Start frontend only
npm run install-deps  # Install all dependencies
npm run build         # Build frontend for production

# Backend scripts
npm start            # Start server (production)
npm run dev          # Start with nodemon (development)

# Frontend scripts
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Configure API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- Font families from [Google Fonts](https://fonts.google.com/)
- UI inspiration from modern web applications

## 📞 Support

For support, email support@panditji.com or create an issue in the repository.

---

**Built with ❤️ for the spiritual community**
