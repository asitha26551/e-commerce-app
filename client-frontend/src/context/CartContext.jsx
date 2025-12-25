// CartContext.jsx
import React, { useEffect, useState, createContext, useContext } from 'react'
import { fetchUserCart, addToUserCart, updateUserCart } from '../services/api'

export const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])


  // Load cart from backend if logged in, else from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserCart(token)
        .then(res => {
          if (res.data.success && res.data.cartData) {
            const cartArr = Object.entries(res.data.cartData).map(([id, quantity]) => ({ id, quantity }));
            setItems(cartArr);
          }
        })
        .catch(() => {});
    } else {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart from local storage');
        }
      }
    }
  }, []);

  // Save cart to local storage whenever it changes (for guests)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (token) {
      for (let i = 0; i < quantity; i++) {
        await addToUserCart(product.id, token);
      }
      const res = await fetchUserCart(token);
      if (res.data.success && res.data.cartData) {
        const cartArr = Object.entries(res.data.cartData).map(([id, quantity]) => ({ id, quantity }));
        setItems(cartArr);
      }
    } else {
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
        if (existingItemIndex > -1) {
          const item = prevItems[existingItemIndex];
          const newQuantity = item.quantity + quantity;
          if (item.quantity >= newQuantity) {
            return prevItems;
          }
          return prevItems.map((it, idx) =>
            idx === existingItemIndex ? { ...it, quantity: newQuantity } : it
          );
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (token) {
      await updateUserCart(productId, 0, token);
      const res = await fetchUserCart(token);
      if (res.data.success && res.data.cartData) {
        const cartArr = Object.entries(res.data.cartData).map(([id, quantity]) => ({ id, quantity }));
        setItems(cartArr);
      }
    } else {
      setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    const token = localStorage.getItem('token');
    if (token) {
      await updateUserCart(productId, quantity, token);
      const res = await fetchUserCart(token);
      if (res.data.success && res.data.cartData) {
        const cartArr = Object.entries(res.data.cartData).map(([id, quantity]) => ({ id, quantity }));
        setItems(cartArr);
      }
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
