import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // You'll create an App component next
import { AuthProvider } from './AuthContext'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);