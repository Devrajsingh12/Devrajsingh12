import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🙏</span>
              </div>
              <span className="text-xl font-display font-bold">Pandit Ji</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted platform for booking qualified Pandits and purchasing authentic holy items. 
              Bringing spirituality and tradition to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Holy Items Shop
              </Link>
              <Link 
                to="/booking" 
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Book Pandit
              </Link>
              <Link 
                to="/features" 
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Features
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Wedding Ceremonies</p>
              <p>Puja Services</p>
              <p>Havan & Rituals</p>
              <p>Griha Pravesh</p>
              <p>Astrology Consultation</p>
              <p>Holy Items Delivery</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400" />
                <span className="text-gray-300 text-sm">info@panditji.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Temple Street<br />
                  New Delhi, India - 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Pandit Ji Booking App. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;