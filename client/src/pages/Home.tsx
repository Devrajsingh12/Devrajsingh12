import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">🙏 Welcome to Pandit Ji Booking</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted platform for booking authentic Pandit services and purchasing holy items for all your religious ceremonies and festivals.
          </p>
          {!user && (
            <div className="space-x-4">
              <Link 
                to="/register" 
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
              <Link 
                to="/booking" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="card text-center">
              <div className="text-4xl mb-4">👨‍🎓</div>
              <h3 className="text-xl font-semibold mb-2">Book Pandits</h3>
              <p className="text-gray-600 mb-4">
                Connect with experienced and verified Pandits for all your religious ceremonies.
              </p>
              <Link to="/booking" className="btn-primary">
                Book Pandit
              </Link>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">Holy Items Shop</h3>
              <p className="text-gray-600 mb-4">
                Purchase authentic religious items, books, and ceremony essentials.
              </p>
              <Link to="/shop" className="btn-primary">
                Visit Shop
              </Link>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Verified Services</h3>
              <p className="text-gray-600 mb-4">
                All our Pandits are verified and have excellent ratings from previous bookings.
              </p>
              <Link to="/features" className="btn-primary">
                Learn More
              </Link>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600 mb-4">
                Simple and quick booking process with instant confirmation and tracking.
              </p>
              {user ? (
                <Link to="/dashboard/user" className="btn-primary">
                  Your Dashboard
                </Link>
              ) : (
                <Link to="/register" className="btn-primary">
                  Join Now
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Social Login Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Quick Access</h2>
          <p className="text-gray-600 mb-8">Connect with us through social platforms</p>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              📘 Continue with Facebook
            </button>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
              🔍 Continue with Google
            </button>
            <button className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition">
              🐦 Continue with Twitter
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            * Social login UI only - authentication is handled via email/password
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="card text-center">
              <div className="text-yellow-500 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">
                "Excellent service! Found a highly knowledgeable Pandit ji for our Griha Pravesh ceremony. Very professional and authentic."
              </p>
              <div className="font-semibold">- Rajesh Kumar</div>
            </div>

            <div className="card text-center">
              <div className="text-yellow-500 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">
                "The holy items shop has everything needed for pujas. Quality products at reasonable prices with fast delivery."
              </p>
              <div className="font-semibold">- Priya Sharma</div>
            </div>

            <div className="card text-center">
              <div className="text-yellow-500 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">
                "As a Pandit, this platform has helped me connect with more families and manage my bookings efficiently."
              </p>
              <div className="font-semibold">- Pandit Suresh ji</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;