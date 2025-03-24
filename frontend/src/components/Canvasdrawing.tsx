"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Pencil, Download, Send } from "lucide-react";
import React from "react";

const letters = [
  'ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ',
  'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ', 'ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ',
  'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ',
  'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ',
  'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'
];


interface CanvasDrawingProps {
  letter: string;
  setIsCorrect: (isCorrect: boolean) => void;
}

const CanvasDrawing: React.FC<CanvasDrawingProps> = ({ letter, setIsCorrect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [recognitionResult, setRecognitionResult] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set initial canvas properties
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = tool === "pen" ? "white" : "black";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setRecognitionResult(null);
  };

  const processImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = 28;
    finalCanvas.height = 28;
    const finalCtx = finalCanvas.getContext("2d");
    if (!finalCtx) return;

    finalCtx.fillStyle = "black";
    finalCtx.fillRect(0, 0, 28, 28);
    finalCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 28, 28);

    const processedImage = finalCanvas.toDataURL("image/jpeg", 1.0);

    try {
      const response = await fetch("http://localhost:8000/api/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: processedImage }),
      });

      if (!response.ok) throw new Error("Failed to send image to server");

      const data = await response.json();
      setRecognitionResult(data.prediction);
      console.log(data.prediction)
      if(letters[data.prediction-1] == letter){
        setIsCorrect(true)
      }else{
        setIsCorrect(false)
      }
    } catch (error) {
      console.error("Error sending image:", error);
      setRecognitionResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Toolbar */}
      <div className="flex gap-4 mb-4">
        <Button variant={tool === "pen" ? "default" : "outline"} onClick={() => setTool("pen")}>
          <Pencil className="w-4 h-4 mr-2" />
          Pen
        </Button>
        <Button variant="outline" onClick={clearCanvas}>Clear</Button>
      </div>

      {/* Canvas */}
      <div className="border-4 border-gray-300 rounded-lg">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="cursor-crosshair"
        />
      </div>

      {/* Recognition Result */}
      {recognitionResult !== null && (
        <div className="mt-4 text-xl font-bold">
          Recognized Alphabet: {letters[recognitionResult - 1]}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <Button onClick={processImage} className="gap-2">
          <Send className="w-4 h-4" />
          Submit
        </Button>
        <Button variant="outline" onClick={processImage} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default CanvasDrawing;
