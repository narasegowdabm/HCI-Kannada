import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import React from "react";
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext' // adjust path if needed

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
