import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useThemeStore from '../store/themeStore';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-200 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/20 hover:-translate-y-0.5 focus:outline-2 focus:outline-red-600 focus:outline-offset-2"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Sun size={20} className="text-white transition-colors duration-200" />
      ) : (
        <Moon size={20} className="text-gray-800 dark:text-white transition-colors duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;