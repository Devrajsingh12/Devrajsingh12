import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, ShoppingBag, Users, Star, Shield, Clock } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book qualified Pandits for any ceremony with just a few clicks'
    },
    {
      icon: ShoppingBag,
      title: 'Holy Items Store',
      description: 'Authentic puja items, idols, and spiritual accessories delivered to your door'
    },
    {
      icon: Users,
      title: 'Verified Pandits',
      description: 'All our Pandits are verified and experienced in various ceremonies'
    },
    {
      icon: Star,
      title: 'Rated Services',
      description: 'Choose from top-rated Pandits based on customer reviews'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure payment processing with data protection'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    }
  ];

  const services = [
    {
      title: 'Wedding Ceremonies',
      description: 'Complete wedding rituals performed by experienced Pandits',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop'
    },
    {
      title: 'Puja Services',
      description: 'Daily pujas, special occasion ceremonies, and spiritual rituals',
      image: 'https://images.unsplash.com/photo-1582662945148-55a7aee1aabb?w=400&h=300&fit=crop'
    },
    {
      title: 'Griha Pravesh',
      description: 'House warming ceremonies with proper vedic traditions',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="text-gradient">Pandit Ji</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your trusted platform for booking qualified Pandits and purchasing authentic holy items. 
              Bringing spirituality and tradition to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isAuthenticated ? (
                <>
                  {!user?.isPandit && (
                    <Link to="/booking" className="btn-primary text-lg px-8 py-3">
                      Book a Pandit
                    </Link>
                  )}
                  <Link to="/shop" className="btn-outline text-lg px-8 py-3">
                    Shop Holy Items
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-3">
                    Get Started
                  </Link>
                  <Link to="/shop" className="btn-outline text-lg px-8 py-3">
                    Browse Shop
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-gray-600">Verified Pandits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">1000+</div>
                <div className="text-gray-600">Holy Items</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Pandit Ji?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a seamless experience for all your spiritual and ceremonial needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive spiritual services for all occasions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their spiritual needs
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-secondary">
                Create Account
              </Link>
              <Link to="/login" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-2 px-8 rounded-lg transition-colors">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;