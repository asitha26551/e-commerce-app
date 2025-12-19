
import React from 'react';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/AdminLoginPage';
import { ToastContainer } from 'react-toastify';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function AppContent() {
  const { state } = useAdminAuth();
  return (
    <>
      <ToastContainer />
      {!state.token ? <LoginPage /> : <AdminDashboardPage />}
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

