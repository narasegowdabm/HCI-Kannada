
import React, { useEffect, useState, useRef } from 'react';
import { cn } from "../lib/utils";

interface CharacterAnimationProps {
  character: string;
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void;
}

const CharacterAnimation: React.FC<CharacterAnimationProps> = ({
  character,
  delay = 0,
  className,
  onAnimationComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout for the animation
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
      if (onAnimationComplete) {
        setTimeout(onAnimationComplete, 500); // Call after animation completes
      }
    }, delay);
    
    // Cleanup function
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, character, onAnimationComplete]);
  
  return (
    <span
      className={cn(
        "inline-block transition-all duration-300",
        isVisible ? "letter-reveal" : "opacity-0 scale-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {character}
    </span>
  );
};

export default CharacterAnimation;
