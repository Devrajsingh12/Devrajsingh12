import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import UserDashboard from './pages/UserDashboard';
import PanditDashboard from './pages/PanditDashboard';
import Features from './pages/Features';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/dashboard/user" element={<UserDashboard />} />
                <Route path="/dashboard/pandit" element={<PanditDashboard />} />
                <Route path="/features" element={<Features />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
