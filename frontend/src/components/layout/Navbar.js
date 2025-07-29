import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Menu, X, ShoppingCart, User, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🙏</span>
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                Pandit Ji
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Shop
            </Link>
            {isAuthenticated && !user?.isPandit && (
              <Link 
                to="/booking" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Book Pandit
              </Link>
            )}
            <Link 
              to="/features" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Features
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Cart Icon */}
                <Link 
                  to="/cart" 
                  className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User size={20} />
                    <span className="font-medium">{user?.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <Link
                        to={user?.isPandit ? '/dashboard/pandit' : '/dashboard/user'}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <ShoppingCart size={16} />
                        <span>Orders</span>
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuthenticated && (
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={closeMenu}
            >
              Shop
            </Link>
            {isAuthenticated && !user?.isPandit && (
              <Link 
                to="/booking" 
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={closeMenu}
              >
                Book Pandit
              </Link>
            )}
            <Link 
              to="/features" 
              className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={closeMenu}
            >
              Features
            </Link>

            {isAuthenticated ? (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <User size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">{user?.name}</span>
                </div>
                <Link
                  to={user?.isPandit ? '/dashboard/pandit' : '/dashboard/user'}
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={closeMenu}
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 btn-primary text-center"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;