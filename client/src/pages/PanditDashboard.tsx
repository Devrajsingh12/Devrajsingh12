import React from 'react';
import { useAuth } from '../context/AuthContext';

const PanditDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">👨‍🎓 Pandit Dashboard</h1>
          <p className="text-xl">Welcome, Pandit {user?.name}!</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-4">Pandit Dashboard Coming Soon</h2>
        <p className="text-gray-600">Manage your bookings, profile, and services here.</p>
      </div>
    </div>
  );
};

export default PanditDashboard;