import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">✨ App Features</h1>
          <p className="text-xl">Discover what makes Pandit Ji Booking special</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="card text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-xl font-bold mb-3">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with separate login for Users and Pandits. 
              Role-based access control ensures secure data management.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">👨‍🎓</div>
            <h3 className="text-xl font-bold mb-3">Verified Pandits</h3>
            <p className="text-gray-600">
              All Pandits are verified with ratings and reviews. Browse profiles, 
              experience, and specializations before booking.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3">Easy Booking</h3>
            <p className="text-gray-600">
              Simple booking process with date, time, and location selection. 
              Real-time status updates and instant confirmations.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">🛍️</div>
            <h3 className="text-xl font-bold mb-3">Holy Items Shop</h3>
            <p className="text-gray-600">
              Complete collection of religious items, books, and ceremony essentials. 
              Categorized browsing with search functionality.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-3">Smart Shopping Cart</h3>
            <p className="text-gray-600">
              Add, remove, and modify cart items. Persistent cart state 
              and seamless checkout experience.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Dashboard Management</h3>
            <p className="text-gray-600">
              Separate dashboards for Users and Pandits. Track bookings, 
              manage orders, and update profiles easily.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
            <p className="text-gray-600">
              Mobile-first design with hamburger menu. Works seamlessly 
              across all devices and screen sizes.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
            <p className="text-gray-600">
              Get instant notifications for booking confirmations, 
              status changes, and order updates.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Integrated payment processing with multiple options. 
              SSL encryption for all transactions.
            </p>
          </div>

        </div>

        {/* Technical Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Technical Stack</h2>
          <div className="grid md:grid-cols-4 gap-6">
            
            <div className="card text-center">
              <div className="text-3xl mb-3">⚛️</div>
              <h4 className="font-bold mb-2">React + TypeScript</h4>
              <p className="text-sm text-gray-600">Modern frontend with type safety</p>
            </div>

            <div className="card text-center">
              <div className="text-3xl mb-3">🟢</div>
              <h4 className="font-bold mb-2">Node.js + Express</h4>
              <p className="text-sm text-gray-600">Robust backend API server</p>
            </div>

            <div className="card text-center">
              <div className="text-3xl mb-3">🍃</div>
              <h4 className="font-bold mb-2">MongoDB + Mongoose</h4>
              <p className="text-sm text-gray-600">NoSQL database with ODM</p>
            </div>

            <div className="card text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h4 className="font-bold mb-2">Tailwind CSS</h4>
              <p className="text-sm text-gray-600">Utility-first styling</p>
            </div>

          </div>
        </div>

        {/* Social Features */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Social Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center">
              <div className="text-4xl mb-4">📘</div>
              <h4 className="font-bold mb-2">Facebook Integration</h4>
              <p className="text-sm text-gray-600">Social login UI (demo only)</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="font-bold mb-2">Google Login</h4>
              <p className="text-sm text-gray-600">Quick access option (UI only)</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🐦</div>
              <h4 className="font-bold mb-2">Twitter Connect</h4>
              <p className="text-sm text-gray-600">Social media integration (UI only)</p>
            </div>

          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            * Social login buttons are for UI demonstration. Authentication uses email/password.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Features;