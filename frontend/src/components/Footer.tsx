
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded-full bg-kid-blue p-2">
                <span className="text-white font-bold text-xl">ಕ</span>
              </div>
              <span className="font-comic text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kid-blue to-kid-purple">
                KannaFun
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              A fun, interactive way for children aged 3-5 to learn the Kannada alphabet through play and exploration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-comic text-lg font-bold text-gray-800 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-kid-blue transition-colors">Home</a>
              </li>
              <li>
                <a href="/learn" className="text-gray-600 hover:text-kid-blue transition-colors">Learn</a>
              </li>
              <li>
                <a href="/play" className="text-gray-600 hover:text-kid-blue transition-colors">Play</a>
              </li>
              <li>
                <a href="/progress" className="text-gray-600 hover:text-kid-blue transition-colors">Progress</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-comic text-lg font-bold text-gray-800 mb-4">Connect</h3>
            <p className="text-gray-600 mb-2">
              We love to hear from parents and educators!
            </p>
            <a href="mailto:info@kannafun.example.com" className="text-kid-blue hover:underline">
              info@kannafun.example.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KannaFun. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-500 text-sm flex items-center">
              Made with <Heart size={14} className="text-kid-pink mx-1" /> for little learners
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
