import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">🙏</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-200 mb-4">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-6">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="btn-primary flex items-center space-x-2"
          >
            <Home size={20} />
            <span>Go Home</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-outline flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Pages
          </h3>
          <div className="space-y-2">
            <Link 
              to="/shop" 
              className="block text-primary-600 hover:text-primary-700 transition-colors"
            >
              Browse Holy Items
            </Link>
            <Link 
              to="/booking" 
              className="block text-primary-600 hover:text-primary-700 transition-colors"
            >
              Book a Pandit
            </Link>
            <Link 
              to="/features" 
              className="block text-primary-600 hover:text-primary-700 transition-colors"
            >
              Our Services
            </Link>
            <Link 
              to="/login" 
              className="block text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;