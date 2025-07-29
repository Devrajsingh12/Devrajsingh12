import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'pandit'>('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
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
          <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-200 p-1 rounded-lg flex">
            <button
              type="button"
              onClick={() => setUserType('user')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                userType === 'user'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              User Login
            </button>
            <button
              type="button"
              onClick={() => setUserType('pandit')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                userType === 'pandit'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pandit Login
            </button>
          </div>
        </div>

        <form className="card space-y-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {userType === 'user' ? '👨‍💼 User Login' : '👨‍🎓 Pandit Login'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {userType === 'user' 
                ? 'Login to book services and shop for holy items'
                : 'Login to manage your bookings and profile'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field mt-1"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-blue-600 space-y-1">
              <div>👨‍💼 User: user@demo.com / password123</div>
              <div>👨‍🎓 Pandit: pandit@demo.com / password123</div>
            </div>
          </div>

          {/* Social Login Buttons (UI Only) */}
          <div className="space-y-2">
            <div className="text-center text-sm text-gray-500">Or continue with</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm"
              >
                📘 Facebook
              </button>
              <button
                type="button"
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition text-sm"
              >
                🔍 Google
              </button>
              <button
                type="button"
                className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition text-sm"
              >
                🐦 Twitter
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">
              * Social login is UI only - use email/password above
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;