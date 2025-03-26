import React, { useEffect, useRef, useState } from 'react';
import { cn } from "../lib/utils";

interface TracingCanvasProps {
  letter: string;
  onAccuracyChange?: (accuracy: number) => void;
  className?: string;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  letter,
  onAccuracyChange,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  // Initialize canvases
  useEffect(() => {
    if (canvasRef.current && letterCanvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      const size = 500;
      
      // Setup main drawing canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#333333';
        setContext(ctx);
      }

      // Setup letter guide canvas
      const letterCanvas = letterCanvasRef.current;
      const letterCtx = letterCanvas.getContext('2d', { willReadFrequently: true });
      if (letterCtx) {
        letterCanvas.width = size * dpr;
        letterCanvas.height = size * dpr;
        letterCanvas.style.width = `${size}px`;
        letterCanvas.style.height = `${size}px`;
        letterCtx.scale(dpr, dpr);
        letterCtx.font = '280px Arial';
        letterCtx.textAlign = 'center';
        letterCtx.textBaseline = 'middle';
        letterCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        letterCtx.fillText(letter, size / 2, size / 2);
      }
    }
  }, [letter]);

  const calculateAccuracy = () => {
    if (!canvasRef.current || !letterCanvasRef.current) return 0;

    const canvas = canvasRef.current;
    const letterCanvas = letterCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const letterCtx = letterCanvas.getContext('2d');

    if (!ctx || !letterCtx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const letterImageData = letterCtx.getImageData(0, 0, letterCanvas.width, letterCanvas.height);
    const userPixels = imageData.data;
    const letterPixels = letterImageData.data;

    let overlap = 0;
    let totalUserPixels = 0;
    let totalLetterPixels = 0;

    for (let i = 0; i < userPixels.length; i += 4) {
      if (userPixels[i + 3] > 0) totalUserPixels++;
      if (letterPixels[i + 3] > 0) totalLetterPixels++;
      if (userPixels[i + 3] > 0 && letterPixels[i + 3] > 0) overlap++;
    }

    const accuracy = Math.min(
      (overlap / totalUserPixels) * 100,
      (overlap / totalLetterPixels) * 100
    );

    return Math.round(accuracy);
  };

  const getPosition = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPosition(e);
    if (pos && context) {
      setPoints([pos]);
      context.beginPath();
      context.moveTo(pos.x, pos.y);
    }
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    if (!isDrawing || !context || !canvasRef.current || !letterCanvasRef.current) return;
    
    const pos = getPosition(e);
    if (pos) {
      // Get the letter canvas context and check if the point is on the letter
      const letterCtx = letterCanvasRef.current.getContext('2d', { willReadFrequently: true });
      if (letterCtx) {
        const dpr = window.devicePixelRatio || 1;
        // Multiply position by dpr to get the correct pixel in the actual canvas image data
        const imageData = letterCtx.getImageData(pos.x * dpr, pos.y * dpr, 1, 1).data;
        const isOnLetter = imageData[3] > 0; // Check if the alpha channel is > 0
        // Set the stroke color based on whether the point is on the letter or not
        context.strokeStyle = isOnLetter ? 'green' : 'red';
      }
      
      setPoints(prev => [...prev, pos]);
      context.lineTo(pos.x, pos.y);
      context.stroke();
      context.beginPath();
      context.moveTo(pos.x, pos.y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    if (context && canvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      context.clearRect(0, 0, canvasRef.current.width / dpr, canvasRef.current.height / dpr);
      setPoints([]);
      onAccuracyChange?.(0);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={letterCanvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        className="relative z-10 touch-none cursor-crosshair bg-transparent"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button
        onClick={clear}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg 
                   shadow-sm hover:bg-white/90 transition-colors duration-200"
      >
        Clear
      </button>
    </div>
  );
};
