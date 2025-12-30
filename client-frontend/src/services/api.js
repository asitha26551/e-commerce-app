import axios from 'axios';

// Normalise backend base URL and ensure single trailing /api prefix
const base = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

const api = axios.create({
	baseURL: base ? `${base}/api` : '/api',
});

export const loginUser = (email, password) =>
  api.post('/user/login', { email, password });

export const registerUser = (name, email, role, password, phone) =>
  api.post('/user/register', { name, email, role, password, phone });

export default api;

// Product helpers
export const fetchAllProducts = () => api.get('/product');
export const fetchProductById = (id) => api.get(`/product/${id}`);

// Cart API helpers

export const fetchUserCart = (token) =>
  api.get('/cart/me', { headers: { token } });

export const addToUserCart = (productId, token) =>
  api.post('/cart/', { productId }, { headers: { token } });

export const updateUserCart = (productId, quantity, token) =>
  api.put(`/cart/${productId}`, { productId, quantity }, { headers: { token } });
