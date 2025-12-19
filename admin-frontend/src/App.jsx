
import React from 'react';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/AdminLoginPage';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function App() {
  // Simple token check (localStorage)
  const token = localStorage.getItem('admin_token');
  if (!token) {
    return <LoginPage />;
  }
  return <AdminDashboardPage />;
}
