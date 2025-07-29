import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalItems: 0,
  totalAmount: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product._id === action.payload.product._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product._id !== action.payload);
      return {
        ...state,
        items: updatedItems
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'CALCULATE_TOTALS': {
      const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      const totalAmount = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      return {
        ...state,
        totalItems,
        totalAmount
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate totals whenever items change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    if (product.stock < quantity) {
      toast.error('Insufficient stock available');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
    toast.success(`${product.name} added to cart`);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
    toast.info('Item removed from cart');
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = state.items.find(item => item.product._id === productId);
    if (item && item.product.stock < quantity) {
      toast.error('Insufficient stock available');
      return;
    }

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Cart cleared');
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};