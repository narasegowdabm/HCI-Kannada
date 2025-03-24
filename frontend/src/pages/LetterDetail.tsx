import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TracingCanvas } from '../components/TracingCanvas';
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ArrowLeft, Book, Pencil, Volume2 } from 'lucide-react';
import type { KannadaLetter } from '../types/letter';
import { kannadaLetters } from '../data/kannada-letters';
import { toast } from "../hooks/use-toast";
import CanvasDrawing from '../components/CanvasDrawing';

const LetterDetail = () => {
  const { letterTranslit } = useParams<{ letterTranslit: string }>();
  const [letterData, setLetterData] = useState<KannadaLetter | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const foundLetter = kannadaLetters.find(
      (item) => item.transliteration === letterTranslit
    );
    if (foundLetter) {
      setLetterData(foundLetter as KannadaLetter);
    }
  }, [letterTranslit]);

  const playSound = () => {
    if (!letterData) return;
  
    const audio = new Audio(`/sounds/${letterData.transliteration}.mp3`);
    console.log(letterData.transliteration)
    audio.play()
      .then(() => {
        
      })
      .catch((error) => {
        
        
      });
  };
  
  if (!letterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Letter not found</h1>
          <Link to="/learn" className="text-blue-500 hover:underline">
            Return to Learn page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/learn"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Letters
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Letter Display */}
          <div className={`${letterData.color} rounded-2xl p-8 flex flex-col items-center justify-center`}>
            <div className="text-8xl sm:text-9xl font-bold text-white mb-4">
              {letterData.letter}
            </div>
            <div className="text-2xl sm:text-3xl text-white font-medium">
              {letterData.transliteration}
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={playSound}
              className="mt-6"
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="practice" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="learn" className="text-lg">
                  <Book className="w-5 h-5 mr-2" /> Learn
                </TabsTrigger>
                <TabsTrigger value="practice" className="text-lg">
                  <Pencil className="w-5 h-5 mr-2" /> Practice
                </TabsTrigger>
                <TabsTrigger value="test" className="text-lg">
                  <Book className="w-5 h-5 mr-2" /> Learn
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">About this letter</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    The letter {letterData.letter} ({letterData.transliteration}) is a
                    {' '}{letterData.type} in the Kannada alphabet. Practice writing
                    it to improve your handwriting skills.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="practice">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Practice Area</h2>
                    <p className="text-gray-600">
                      Trace the letter to practice writing.
                    </p>
                  </div>

                  <TracingCanvas
                    letter={letterData.letter}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  />
                </div>
              </TabsContent>

              <TabsContent value="test">
                <CanvasDrawing
                letter = {letterData.letter}
                setIsCorrect = {setIsCorrect}
                />
                {isCorrect && 
                  <h1>
                    correct
                  </h1>
                }
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterDetail;
