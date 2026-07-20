import React, { createContext, useState, useEffect } from 'react';
import { DUMMY_ACCOUNTS, USER_ROLES } from '../constants/index.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('obsUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('obsUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check against dummy accounts
    if (email === DUMMY_ACCOUNTS.admin.email && password === DUMMY_ACCOUNTS.admin.password) {
      const userData = {
        id: 'admin-001',
        email,
        role: USER_ROLES.ADMIN,
        name: 'Administrator',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff',
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('obsUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    if (email === DUMMY_ACCOUNTS.teacher.email && password === DUMMY_ACCOUNTS.teacher.password) {
      const userData = {
        id: 'teacher-001',
        email,
        role: USER_ROLES.TEACHER,
        name: 'John Teacher',
        avatar: 'https://ui-avatars.com/api/?name=Teacher&background=7C3AED&color=fff',
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('obsUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    if (email === DUMMY_ACCOUNTS.student.email && password === DUMMY_ACCOUNTS.student.password) {
      const userData = {
        id: 'student-001',
        email,
        role: USER_ROLES.STUDENT,
        name: 'Jane Student',
        avatar: 'https://ui-avatars.com/api/?name=Student&background=10B981&color=fff',
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('obsUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('obsUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
