import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some holy items to get started!</p>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">🛒 Shopping Cart</h1>
          <p className="text-xl">Review your items and proceed to checkout</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product._id} className="card">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">{item.product.description}</p>
                    <p className="text-orange-600 font-bold">₹{item.product.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">₹{item.product.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
              <Link to="/shop" className="text-orange-600 hover:text-orange-800">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹50</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{getTotalPrice() + 50}</span>
                  </div>
                </div>
              </div>

              {user ? (
                <button className="w-full btn-primary mb-4">
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-2">Please login to checkout</p>
                  <Link to="/login" className="w-full btn-primary block text-center">
                    Login to Checkout
                  </Link>
                </div>
              )}

              <div className="text-xs text-gray-500 text-center">
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;