
import React from 'react';
import { SparklesIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SparklesIcon className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-800">Fashion Product Studio</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-200">Docs</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-200">About</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors duration-200">Help</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
