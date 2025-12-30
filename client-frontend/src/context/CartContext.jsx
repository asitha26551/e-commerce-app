// CartContext.jsx
import React, { useEffect, useState, createContext, useContext } from 'react'
import { fetchUserCart, addToUserCart, updateUserCart, fetchAllProducts } from '../services/api'

export const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])


  // Load cart from backend if logged in, else from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // For logged-in users, load cart quantities and enrich with product data
      Promise.all([fetchUserCart(token), fetchAllProducts()])
        .then(([cartRes, productsRes]) => {
          if (!cartRes.data.success || !cartRes.data.cartData) return;

          const products = Array.isArray(productsRes.data.products) ? productsRes.data.products : [];

          const mappedProducts = products.map(p => ({
            id: p._id,
            name: p.name,
            price: p.price,
            stock: p.stock,
            category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
            images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
            rating: 4.5,
            description: p.description || ''
          }));

          // console.log('DEBUG cartData:', cartRes.data.cartData);
          // console.log('DEBUG mappedProducts:', mappedProducts);

          const cartArr = Object.entries(cartRes.data.cartData)
            .map(([id, quantity]) => {
              // Try both string and ObjectId matching
              const product = mappedProducts.find(p => p.id == id || String(p.id) === String(id));
              if (!product) {
                // console.warn('No product found for cart id', id);
                return null;
              }
              return { ...product, quantity };
            })
            .filter(Boolean);

          // console.log('DEBUG cartArr:', cartArr);
          setItems(cartArr);
        })
        .catch((e) => { /* console.error('CartContext fetch error', e); */ });
    } else {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          // console.error('Failed to parse cart from local storage');
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
      // Refresh cart from backend and enrich with product details
      const [cartRes, productsRes] = await Promise.all([
        fetchUserCart(token),
        fetchAllProducts(),
      ]);

      if (cartRes.data.success && cartRes.data.cartData) {
        const products = Array.isArray(productsRes.data.products) ? productsRes.data.products : [];
        const mappedProducts = products.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
          images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
          rating: 4.5,
          description: p.description || ''
        }));

        const cartArr = Object.entries(cartRes.data.cartData)
          .map(([id, qty]) => {
            const prod = mappedProducts.find(p => String(p.id) === String(id));
            if (!prod) return null;
            return { ...prod, quantity: qty };
          })
          .filter(Boolean);

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
      const [cartRes, productsRes] = await Promise.all([
        fetchUserCart(token),
        fetchAllProducts(),
      ]);

      if (cartRes.data.success && cartRes.data.cartData) {
        const products = Array.isArray(productsRes.data.products) ? productsRes.data.products : [];
        const mappedProducts = products.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
          images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
          rating: 4.5,
          description: p.description || ''
        }));

        const cartArr = Object.entries(cartRes.data.cartData)
          .map(([id, qty]) => {
            const prod = mappedProducts.find(p => String(p.id) === String(id));
            if (!prod) return null;
            return { ...prod, quantity: qty };
          })
          .filter(Boolean);

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
      const [cartRes, productsRes] = await Promise.all([
        fetchUserCart(token),
        fetchAllProducts(),
      ]);

      if (cartRes.data.success && cartRes.data.cartData) {
        const products = Array.isArray(productsRes.data.products) ? productsRes.data.products : [];
        const mappedProducts = products.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          category: p.categoryId && p.categoryId.name ? p.categoryId.name : '',
          images: p.images && p.images.length ? p.images.map(img => img.imageUrl) : [],
          rating: 4.5,
          description: p.description || ''
        }));

        const cartArr = Object.entries(cartRes.data.cartData)
          .map(([id, qty]) => {
            const prod = mappedProducts.find(p => String(p.id) === String(id));
            if (!prod) return null;
            return { ...prod, quantity: qty };
          })
          .filter(Boolean);

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
