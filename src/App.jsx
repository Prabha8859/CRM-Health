import React from 'react';
import AppRouter from './Router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MockDataProvider } from './context/MockDataContext';

function App() {
  return (
    <AuthProvider>
      <MockDataProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </MockDataProvider>
    </AuthProvider>
  );
}

export default App;
