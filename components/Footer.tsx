
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Fashion Product Studio. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 mt-2 md:mt-0">
            <span className="font-semibold text-primary">Stay TechUp.</span> | 
            <a href="#" className="ml-1 hover:underline">Provide Feedback</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
