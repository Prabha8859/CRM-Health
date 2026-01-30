import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { ThemeProvider } from './context/ThemeContext';

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

  return (
    <ThemeProvider>
      <AppRouter isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
    </ThemeProvider>
  );
}

export default App;
