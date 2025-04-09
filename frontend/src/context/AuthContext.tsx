// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User { _id: string; email: string; }

interface AuthContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // initialize from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });

  // whenever user changes, persist or remove
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
