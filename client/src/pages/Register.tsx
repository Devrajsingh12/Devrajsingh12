import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPandit, setIsPandit] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, isPandit);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in here
            </Link>
          </p>
        </div>

        <form className="card space-y-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Join Pandit Ji Booking</h3>
            <p className="text-sm text-gray-600 mt-1">
              Create an account to start booking services or offering Pandit services
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field mt-1"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field mt-1"
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field mt-1"
              placeholder="Confirm your password"
            />
          </div>

          {/* Account Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="accountType"
                  checked={!isPandit}
                  onChange={() => setIsPandit(false)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">👨‍💼 User Account</div>
                  <div className="text-sm text-gray-500">Book Pandit services and shop for holy items</div>
                </div>
              </label>

              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="accountType"
                  checked={isPandit}
                  onChange={() => setIsPandit(true)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">👨‍🎓 Pandit Account</div>
                  <div className="text-sm text-gray-500">Offer religious services and manage bookings</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-orange-600 hover:text-orange-500">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-orange-600 hover:text-orange-500">Privacy Policy</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;