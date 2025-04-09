import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, BookOpen, Play, Award, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overallAccuracy, setOverallAccuracy] = useState<number | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Scroll effect for styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Memoized fetch function
  const fetchOverallAccuracy = useCallback(async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/progress/${user._id}`);
      const data = await res.json();
      const progress: Record<string, { attempts: number; success: number }> = data.progress || {};
      let totalAttempts = 0;
      let totalSuccess = 0;
      Object.values(progress).forEach(p => {
        totalAttempts += p.attempts;
        totalSuccess += p.success;
      });
      setOverallAccuracy(totalAttempts > 0 ? Math.round((totalSuccess / totalAttempts) * 100) : 0);
    } catch (err) {
      console.error("Error fetching overall accuracy:", err);
    }
  }, [user]);

  // 1️⃣ Fetch once on login (when user._id becomes available)
  useEffect(() => {
    if (user?._id) {
      fetchOverallAccuracy();
    }
  }, [user, fetchOverallAccuracy]);

  const navItems = [
    { name: "Home", icon: <Home size={20} />, href: "/home" },
    { name: "Learn", icon: <BookOpen size={20} />, href: "/learn" },
    { name: "Play", icon: <Play size={20} />, href: "/play" },
    { name: "Progress", icon: <Award size={20} />, href: "/progress" }
  ];

  const handleLogout = () => {
    logout();
    navigate("/signin");
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition ${scrolled ? "bg-white shadow py-2" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <div className="rounded-full bg-kid-blue p-2">
            <span className="text-white font-bold">ಕ</span>
          </div>
          <span className="font-comic text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kid-blue to-kid-purple">
            Kannada ಕಲಿ
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(item => {
            if (item.name === "Progress") {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    fetchOverallAccuracy();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-1 hover:text-kid-blue relative"
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {overallAccuracy !== null && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {overallAccuracy}%
                    </span>
                  )}
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1 hover:text-kid-blue"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
          <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-kid-blue">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-kid-blue hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsOpen(o => !o)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow p-4 space-y-2">
          {navItems.map(item => {
            if (item.name === "Progress") {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    fetchOverallAccuracy();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 relative"
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {overallAccuracy !== null && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {overallAccuracy}%
                    </span>
                  )}
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
          <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-kid-blue">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <button className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
