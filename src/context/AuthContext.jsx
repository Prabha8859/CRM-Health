import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/rbac';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  }, [user]);

  const login = async (role, email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        // In a real app, we would validate credentials here
        // For now, we accept any login and assign the selected role
        
        const mockUser = {
          id: '1',
          name: email.split('@')[0] || 'User',
          email: email,
          role: role,
          avatar: `https://i.pravatar.cc/150?u=${email}`,
        };

        setUser(mockUser);
        resolve(mockUser);
      }, 1000); // 1 second delay
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
