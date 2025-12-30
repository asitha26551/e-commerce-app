
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/AdminLoginPage';
import { AddProductPage } from './pages/AddProductPage';
import { EditProductPage } from './pages/EditProductPage';
import { ToastContainer } from 'react-toastify';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function AppContent() {
  const { state } = useAdminAuth();
  return (
    <>
      <ToastContainer />
      {!state.token ? (
        <LoginPage />
      ) : (
        <Routes>
          <Route path="/" element={<AdminDashboardPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
        </Routes>
      )}
    </>
  );
}

export function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}

