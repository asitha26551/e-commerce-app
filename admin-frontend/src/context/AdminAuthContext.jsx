import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  token: localStorage.getItem('admin_token') || '',
};

function adminAuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('admin_token', action.token);
      return { ...state, token: action.token };
    case 'LOGOUT':
      localStorage.removeItem('admin_token');
      return { ...state, token: '' };
    default:
      return state;
  }
}

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);
  return (
    <AdminAuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
