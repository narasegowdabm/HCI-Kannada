import React, { useState } from 'react';
import { cn } from "../lib/utils";
import CharacterAnimation from './CharacterAnimation';

interface AlphabetCardProps {
  letter: string;
  transliteration: string;
  audioSrc?: string;
  color?: string;
  className?: string;
  delay?: number;
}

const AlphabetCard: React.FC<AlphabetCardProps> = ({
  letter,
  transliteration,
  audioSrc,
  color = "bg-kid-blue",
  className,
  delay = 0
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioSrc && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleCardClick = () => {
    playSound();
    setIsFlipped(!isFlipped);
    // Add a wiggle animation to show it was clicked
    const card = document.getElementById(`card-${letter}`);
    if (card) {
      card.classList.add('animate-wiggle');
      setTimeout(() => {
        card.classList.remove('animate-wiggle');
      }, 1000);
    }
  };

  return (
    <div
      id={`card-${letter}`}
      className={cn(
        "alphabet-card card-3d w-full aspect-square",
        color,
        className,
        "opacity-0"
      )}
      style={{
        animation: `fade-in 0.5s ease-out ${delay}ms forwards`,
        transform: isHovered ? "scale(1.05)" : "scale(1)"
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full perspective-effect">
        <div
          className={cn(
            "absolute w-full h-full backface-hidden transition-all duration-500 rounded-3xl flex flex-col items-center justify-center",
            isFlipped ? "opacity-0 rotate-y-180" : "opacity-100"
          )}
        >
          <CharacterAnimation
            character={letter}
            delay={delay + 200}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
          />
        </div>
        <div
          className={cn(
            "absolute w-full h-full backface-hidden transition-all duration-500 rounded-3xl flex flex-col items-center justify-center bg-white",
            isFlipped ? "opacity-100 rotate-0" : "opacity-0 rotate-y-180"
          )}
        >
          <p className="text-2xl md:text-3xl font-comic text-gray-700">
            {transliteration}
          </p>
        </div>
      </div>
      
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => console.error("Audio error:", e)}
        />
      )}
      
      <div className={cn(
        "absolute bottom-2 right-2 transition-opacity",
        isPlaying ? "opacity-100" : "opacity-0"
      )}>
        <div className="flex space-x-1">
          <span className="w-1 h-3 bg-white animate-pulse-gentle rounded-full"></span>
          <span className="w-1 h-4 bg-white animate-pulse-gentle rounded-full" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-1 h-2 bg-white animate-pulse-gentle rounded-full" style={{ animationDelay: "0.1s" }}></span>
        </div>
      </div>
    </div>
  );
};

export default AlphabetCard;
