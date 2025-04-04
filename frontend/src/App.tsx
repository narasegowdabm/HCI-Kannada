import React, { useEffect, useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase"; // Firebase auth import
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Learn from "./pages/Learn";
import LetterDetail from "./pages/LetterDetail";
import Play from "./pages/Play";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserProgress from "./components/UserProgress"; // Import UserProgress component

// Create a client for React Query
const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser !== null);
    });
    return () => unsubscribe();
  }, []);

  if (user === null) return <div>Loading...</div>; // Loading state
  return user ? children : <Navigate to="/signin" />;
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notifications */}
      <Toaster />
      <Sonner />

      {/* Router setup */}
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to signin */}
          <Route path="/" element={<Navigate to="/signin" />} />

          {/* Public Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
          <Route path="/learn/:letterTranslit" element={<ProtectedRoute><LetterDetail /></ProtectedRoute>} />
          <Route path="/play" element={<ProtectedRoute><Play /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><UserProgress /></ProtectedRoute>} />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
