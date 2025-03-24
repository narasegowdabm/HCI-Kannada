import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Book, Pen } from 'lucide-react';
import { kannadaLetters } from '../data/kannada-letters';

const Learn: React.FC = () => {
  return (
    <>
      <Navigation />
      <main className="page-container pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Learn Kannada Alphabet</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the beautiful Kannada alphabet! Click on any letter to learn more and practice writing.
            </p>
          </div>
          
          {/* Vowels Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Book className="mr-2" /> Vowels (ಸ್ವರಗಳು)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {kannadaLetters.filter(item => item.type === 'vowel').map((letter) => (
                <Link 
                  to={`/learn/${letter.transliteration}`} 
                  key={letter.letter}
                  className={`alphabet-card ${letter.color} transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
                >
                  <span className="text-6xl md:text-7xl font-bold text-white">{letter.letter}</span>
                  <span className="mt-2 text-xl text-white font-comic">{letter.transliteration}</span>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Consonants Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Pen className="mr-2" /> Consonants (ವ್ಯಂಜನಗಳು)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {kannadaLetters.filter(item => item.type === 'consonant').map((letter) => (
                <Link 
                  to={`/learn/${letter.transliteration}`} 
                  key={letter.letter}
                  className={`alphabet-card ${letter.color} transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
                >
                  <span className="text-6xl md:text-7xl font-bold text-white">{letter.letter}</span>
                  <span className="mt-2 text-xl text-white font-comic">{letter.transliteration}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Learn;
