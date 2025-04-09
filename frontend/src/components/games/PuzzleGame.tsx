import React, { useState, useEffect } from 'react';
import { kannadaAlphabet } from '../../lib/alphabetData';
import { Button } from '../../components/ui/button';
import { Shuffle, Check, AlertCircle, Award } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import type { KannadaLetter } from '../../lib/alphabetData';
import confetti from 'canvas-confetti';

const AlphabetOrderingGame: React.FC = () => {
  const [letters, setLetters] = useState<KannadaLetter[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);
  const [draggedLetter, setDraggedLetter] = useState<KannadaLetter | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [categoryFilter, setCategoryFilter] = useState('vowel');
  const [score, setScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [level, setLevel] = useState(1);
  const { toast } = useToast();

  const getFilteredLetters = (): KannadaLetter[] => {
    const filtered = kannadaAlphabet.filter(letter => letter.category === categoryFilter);
    switch(difficulty) {
      case 'easy': return filtered.slice(0, 5);
      case 'medium': return filtered.slice(0, 8);
      case 'hard': return filtered;
      default: return filtered.slice(0, 5);
    }
  };

  const initializeGame = () => {
    const filteredLetters = getFilteredLetters();
    const shuffledLetters = [...filteredLetters].sort(() => Math.random() - 0.5);
    setLetters(shuffledLetters);
    setGameStarted(true);
    setIsCorrectOrder(false);
    setShowSuccess(false);
    setAttemptCount(0);
    toast({ title: 'Game Started', description: `Arrange the ${categoryFilter}s!`, duration: 3000 });
  };

  const handleDragStart = (e, letter, index) => {
    setDraggedLetter(letter);
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', letter.id);
    e.currentTarget.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    new Audio('/audio/drag.mp3').play();
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('ring-4', 'ring-purple-300');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('ring-4', 'ring-purple-300');
  };

  const handleDrop = (e, _letter, targetIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-4', 'ring-purple-300');
    if (draggedLetter == null || draggedIndex == null || draggedIndex === targetIndex) return;
    const newLetters = [...letters];
    const [moved] = newLetters.splice(draggedIndex, 1);
    newLetters.splice(targetIndex, 0, moved);
    setLetters(newLetters);
    setDraggedLetter(null);
    toast({ description: `Moved ${moved.name}`, duration: 1500 });
  };

  const checkOrder = () => {
    const correct = getFilteredLetters();
    const isCorrect = correct.every((l, i) => letters[i].id === l.id);
    setIsCorrectOrder(isCorrect);
    setAttemptCount(attemptCount + 1);
    if (isCorrect) {
      const points = Math.max(10 - attemptCount, 1) * level;
      setScore(score + points);
      setShowSuccess(true);
      new Audio('/audio/success.mp3').play().catch(() => {});
      confetti({ particleCount: 100, spread: 60 });
      toast({ title: 'Correct!', description: `+${points} points`, duration: 3000 });
      setTimeout(() => {
        setShowSuccess(false);
        // Level up logic...
      }, 2000);
    } else {
      new Audio('/audio/error.mp3').play().catch(() => {});
      toast({ title: 'Try Again', variant: 'destructive', duration: 3000 });
    }
  };

  const resetGame = () => {
    setScore(0); setLevel(1); setDifficulty('easy'); setCategoryFilter('vowel'); setGameComplete(false);
    toast({ title: 'Reset', description: 'New game!', duration: 2000 });
    initializeGame();
  };

  useEffect(() => { if (gameStarted) initializeGame(); }, [difficulty, categoryFilter]);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 flex justify-center">
      <div className="w-full max-w-4xl p-8 bg-white backdrop-blur-md bg-opacity-70 rounded-2xl shadow-2xl">
        {!gameStarted && !gameComplete ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-purple-700">Kannada Alphabet Challenge</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Difficulty:</label>
                <select className="w-full p-2 border rounded-lg focus:ring focus:ring-purple-300" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category:</label>
                <select className="w-full p-2 border rounded-lg focus:ring focus:ring-purple-300" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                  <option value="vowel">Vowels</option>
                  <option value="consonant">Consonants</option>
                </select>
              </div>
            </div>
            <Button onClick={initializeGame} className="w-full py-3 mt-4 font-bold uppercase tracking-wide">
              Start Game
            </Button>
          </div>
        ) : gameComplete ? (
          <div className="text-center space-y-4">
            <Award className="mx-auto text-yellow-400" size={64} />
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="text-lg">Your final score: <span className="font-semibold">{score}</span></p>
            <Button onClick={resetGame} className="w-full py-2 font-bold uppercase">
              Play Again
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-600">Level {level}</p>
                <p className="text-sm text-gray-600 capitalize">{categoryFilter} - {difficulty}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Attempts</p>
                <p className="text-sm">{attemptCount}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="flex items-center mb-4 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="mr-2 text-blue-500" />
              <p className="text-sm text-blue-700">Drag & drop to order the letters correctly.</p>
            </div>

            {/* Letters */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {letters.map((letter, idx) => (
                <div key={letter.id}
                  className={`flex items-center justify-center h-20 w-20 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 ${isCorrectOrder && showSuccess ? 'ring-4 ring-green-300' : ''}`}
                  draggable={!showSuccess}
                  onDragStart={e => handleDragStart(e, letter, idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={e => handleDrop(e, letter, idx)}
                >
                  <span className="text-4xl font-bold font-baloo">{letter.character}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <Button onClick={checkOrder} disabled={showSuccess} className="flex items-center gap-2 py-2 px-6 font-semibold">
                <Check size={16} /> Check Order
              </Button>
            </div>

            {/* Reference */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Letters Info</h3>
              <div className="grid grid-cols-2 gap-3">
                {letters.map(letter => (
                  <div key={letter.id} className="flex items-center p-2 bg-white rounded-lg shadow-sm">
                    <span className="text-2xl font-baloo mr-3">{letter.character}</span>
                    <div>
                      <p className="font-medium">{letter.name}</p>
                      <p className="text-xs text-gray-500">{letter.pronunciation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AlphabetOrderingGame;
