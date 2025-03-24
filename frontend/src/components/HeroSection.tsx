
import React, { useEffect, useRef, useState } from 'react';
import CharacterAnimation from './CharacterAnimation';
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample letters for animation
  const letters = [
    { letter: 'ಅ', color: 'text-kid-blue', size: 'text-8xl', position: { x: 20, y: 10 }, delay: 0 },
    { letter: 'ಆ', color: 'text-kid-purple', size: 'text-7xl', position: { x: 60, y: 40 }, delay: 200 },
    { letter: 'ಇ', color: 'text-kid-yellow', size: 'text-6xl', position: { x: 10, y: 60 }, delay: 400 },
    { letter: 'ಈ', color: 'text-kid-green', size: 'text-5xl', position: { x: 70, y: 30 }, delay: 600 },
    { letter: 'ಉ', color: 'text-kid-pink', size: 'text-7xl', position: { x: 30, y: 70 }, delay: 800 },
    { letter: 'ಊ', color: 'text-kid-orange', size: 'text-6xl', position: { x: 50, y: 20 }, delay: 1000 },
  ];

  useEffect(() => {
    // Mark component as loaded after initial render
    setIsLoaded(true);

    // Function to handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    };

    // Function for devices with gyroscope
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.beta || !e.gamma) return;

      const y = (e.beta - 45) / 90; // -1 to 1
      const x = e.gamma / 90; // -1 to 1

      setMousePosition({
        x: 0.5 + x * 0.5,
        y: 0.5 + y * 0.5
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-24">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="relative z-10">
          {/* Main content */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-kid-blue via-kid-purple to-kid-pink">
                Learn Kannada
              </span>
              <span className="block mt-1">Through Play & Fun</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              An interactive journey for children aged 3-5 to explore the beautiful
              Kannada alphabet with engaging animations and playful activities.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="btn-kid-primary px-8 py-4 text-lg"
                onClick={() => window.location.href = "http://localhost:8081/learn"}
              >
                Start Learning
              </button>

              <button
                className="btn-kid-secondary px-8 py-4 text-lg"
                onClick={() => window.location.href = "http://localhost:8081/play"}
              >
                Explore Activities
              </button>
            </div>
          </div>
        </div>

        {/* 3D Floating Letters */}
        <div className="absolute inset-0 pointer-events-none">
          {isLoaded && letters.map((item, index) => (
            <div
              key={index}
              className="absolute transform transition-transform duration-300 animate-float"
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                animationDelay: `${index * 0.2}s`,
                transform: `translate3d(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px, 0) scale(${1 + Math.sin(Date.now() / 1000 + index) * 0.05})`,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                zIndex: index
              }}
            >
              <CharacterAnimation
                character={item.letter}
                delay={item.delay}
                className={`${item.color} ${item.size} font-bold opacity-70 filter drop-shadow-lg transform-style-3d`}
              />
            </div>
          ))}
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-kid-blue opacity-10 animate-pulse-gentle"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-kid-purple opacity-10 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-kid-yellow opacity-10 animate-pulse-gentle" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-24 md:h-32"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            fill="white"
          >
            <path
              d="M0,50 C150,20 350,80 720,50 C1080,20 1290,80 1440,40 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
