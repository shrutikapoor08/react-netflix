import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="relative top-0 left-0 right-0 z-[100] py-5 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
      <div className="max-w-6xl mx-auto px-6 md:px-6 flex justify-between items-center">
        <div className="flex-shrink-0">
          <h1 className="text-xl lg:text-4xl font-bold text-red-600">REACTFLIX</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;