import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AlphabetGrid from '../components/AlphabetGrid';
import Footer from '../components/Footer';
import { ArrowDown, BookOpen, Play, Award } from 'lucide-react';

const Index = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a[href^="#"]');
      
      if (anchorLink) {
        e.preventDefault();
        const targetId = anchorLink.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Scroll Down Indicator */}
      <div className="flex justify-center -mt-10 relative z-10">
        <a 
          href="#alphabet" 
          className="flex flex-col items-center text-gray-600 hover:text-kid-blue transition-colors"
        >
          <span className="mb-2 font-comic">Scroll Down</span>
          <ArrowDown className="animate-bounce-slight" />
        </a>
      </div>
      
      {/* <section id="alphabet" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AlphabetGrid />
        </div>
      </section> */}
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Fun Way to Learn Kannada
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our interactive platform makes learning the Kannada alphabet enjoyable and effective for young children.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="kid-card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-kid-blue flex items-center justify-center mb-4">
                <BookOpen className="text-white" size={30} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Engaging activities and animations to help children recognize and remember Kannada letters.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="kid-card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-kid-purple flex items-center justify-center mb-4">
                <Play className="text-white" size={30} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Learning Games</h3>
              <p className="text-gray-600">
                Fun games and activities designed to reinforce letter recognition and pronunciation.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="kid-card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-kid-yellow flex items-center justify-center mb-4">
                <Award className="text-white" size={30} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your child's learning journey with our intuitive progress tracking system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-kid-blue to-kid-purple rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Begin your child's Kannada learning adventure today with our engaging educational platform.
          </p>
          <button className="btn-kid bg-white text-kid-blue text-lg px-10 py-4">
            Get Started Now
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
