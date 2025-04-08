import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, BookOpen, Play, Award, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overallAccuracy, setOverallAccuracy] = useState<number | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", icon: <Home size={20} />, href: "/home" },
    { name: "Learn", icon: <BookOpen size={20} />, href: "/learn" },
    { name: "Play", icon: <Play size={20} />, href: "/play" },
    { name: "Progress", icon: <Award size={20} />, href: "/progress" }
  ];

  // Fetch overall progress for the logged-in user
  useEffect(() => {
    if (!user?._id) {
      setOverallAccuracy(null);
      return;
    }
    fetch(`http://localhost:5000/api/auth/progress/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        const progress: Record<string, { attempts: number; success: number }> = data.progress || {};
        let totalAttempts = 0;
        let totalSuccess = 0;
        Object.values(progress).forEach((p) => {
          totalAttempts += p.attempts;
          totalSuccess += p.success;
        });
        if (totalAttempts > 0) {
          setOverallAccuracy(Number(((totalSuccess / totalAttempts) * 100).toFixed(0)));
        } else {
          setOverallAccuracy(null);
        }
      })
      .catch(console.error);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition ${scrolled ? "bg-white shadow py-2" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-kid-blue p-2">
            <span className="text-white font-bold">ಕ</span>
          </div>
          <span className="font-comic text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kid-blue to-kid-purple">
            Kannada ಕಲಿ
          </span>
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center space-x-1 hover:text-kid-blue relative"
            >
              {item.icon}
              <span>{item.name}</span>
              {item.name === "Progress" && overallAccuracy !== null && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {overallAccuracy}%
                </span>
              )}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-kid-blue">
            <LogOut size={20} /><span>Logout</span>
          </button>
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-kid-blue hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsOpen(o => !o)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.name === "Progress" && overallAccuracy !== null && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {overallAccuracy}%
                </span>
              )}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-kid-blue">
            <LogOut size={20} /><span>Logout</span>
          </button>
          <button className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <Settings size={20} /><span>Settings</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
