import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            🙏 Pandit Ji Booking
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-200 transition">Home</Link>
            <Link to="/booking" className="hover:text-orange-200 transition">Book Pandit</Link>
            <Link to="/shop" className="hover:text-orange-200 transition">Shop</Link>
            <Link to="/features" className="hover:text-orange-200 transition">Features</Link>
            
            {user ? (
              <>
                <Link to="/cart" className="hover:text-orange-200 transition relative">
                  🛒 Cart
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="hover:text-orange-200 transition">Orders</Link>
                <Link 
                  to={user.isPandit ? "/dashboard/pandit" : "/dashboard/user"} 
                  className="hover:text-orange-200 transition"
                >
                  Dashboard
                </Link>
                <span className="text-orange-200">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-orange-700 hover:bg-orange-800 px-3 py-1 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-orange-200 transition">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-orange-700 hover:bg-orange-800 px-3 py-1 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-orange-200 transition">Home</Link>
            <Link to="/booking" className="block py-2 hover:text-orange-200 transition">Book Pandit</Link>
            <Link to="/shop" className="block py-2 hover:text-orange-200 transition">Shop</Link>
            <Link to="/features" className="block py-2 hover:text-orange-200 transition">Features</Link>
            
            {user ? (
              <>
                <Link to="/cart" className="block py-2 hover:text-orange-200 transition">
                  🛒 Cart ({getTotalItems()})
                </Link>
                <Link to="/orders" className="block py-2 hover:text-orange-200 transition">Orders</Link>
                <Link 
                  to={user.isPandit ? "/dashboard/pandit" : "/dashboard/user"} 
                  className="block py-2 hover:text-orange-200 transition"
                >
                  Dashboard
                </Link>
                <div className="py-2 text-orange-200">Welcome, {user.name}</div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-orange-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-orange-200 transition">Login</Link>
                <Link to="/register" className="block py-2 hover:text-orange-200 transition">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;