
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Play, Award, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, href: '/' },
    { name: 'Learn', icon: <BookOpen size={20} />, href: '/learn' },
    { name: 'Play', icon: <Play size={20} />, href: '/play' },
    { name: 'Progress', icon: <Award size={20} />, href: '/progress' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-soft py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="rounded-full bg-kid-blue p-2">
              <span className="text-white font-bold text-xl">ಕ</span>
            </div>
            <span className="font-comic text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kid-blue to-kid-purple">
              Kannada ಕಲಿ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1 font-comic text-gray-700 hover:text-kid-blue transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <button className="btn-kid-primary flex items-center space-x-2">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-kid-blue hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white shadow-lg rounded-b-3xl mx-4 animate-slide-down">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-3 px-3 py-4 text-base font-comic text-gray-700 hover:bg-kid-blue/10 hover:text-kid-blue rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-4">
              <button 
                className="btn-kid-primary w-full flex items-center justify-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
