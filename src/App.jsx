import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import './App.css';

function App() {
  // On initial load, check if the user was already authenticated.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Whenever the authentication state changes, update localStorage.
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return <AppRouter isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />;
}

export default App;
