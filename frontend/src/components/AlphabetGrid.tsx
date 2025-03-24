
import React from 'react';
import AlphabetCard from './AlphabetCard';

// Sample Kannada vowels (you would expand this with the full alphabet)
const kannada = [
  { letter: 'ಅ', transliteration: 'a', color: 'bg-kid-blue' },
  { letter: 'ಆ', transliteration: 'aa', color: 'bg-kid-purple' },
  { letter: 'ಇ', transliteration: 'i', color: 'bg-kid-yellow' },
  { letter: 'ಈ', transliteration: 'ii', color: 'bg-kid-green' },
  { letter: 'ಉ', transliteration: 'u', color: 'bg-kid-pink' },
  { letter: 'ಊ', transliteration: 'uu', color: 'bg-kid-orange' },
  { letter: 'ಋ', transliteration: 'ru', color: 'bg-kid-blue' },
  { letter: 'ಎ', transliteration: 'e', color: 'bg-kid-purple' },
  { letter: 'ಏ', transliteration: 'ee', color: 'bg-kid-yellow' },
  { letter: 'ಐ', transliteration: 'ai', color: 'bg-kid-green' },
  { letter: 'ಒ', transliteration: 'o', color: 'bg-kid-pink' },
  { letter: 'ಓ', transliteration: 'oo', color: 'bg-kid-orange' },
  { letter: 'ಔ', transliteration: 'au', color: 'bg-kid-blue' },
  { letter: 'ಅಂ', transliteration: 'am', color: 'bg-kid-purple' },
  { letter: 'ಅಃ', transliteration: 'aha', color: 'bg-kid-yellow' },
];

const AlphabetGrid: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Learn Kannada Vowels</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the vowels of the Kannada alphabet through interactive cards.
          Click on each card to hear pronunciation and see transliteration!
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {kannada.map((item, index) => (
          <AlphabetCard
            key={item.letter}
            letter={item.letter}
            transliteration={item.transliteration}
            color={item.color}
            delay={index * 100} // Staggered animation
          />
        ))}
      </div>
    </div>
  );
};

export default AlphabetGrid;
