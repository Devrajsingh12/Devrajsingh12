import React from 'react';

const Orders: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">📦 Your Orders</h1>
          <p className="text-xl">Track your order history and status</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-4">Orders Page Coming Soon</h2>
        <p className="text-gray-600">This page will show your order history and tracking information.</p>
      </div>
    </div>
  );
};

export default Orders;