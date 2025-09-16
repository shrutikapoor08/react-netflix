import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDarkMode: true, // Default to dark mode to match current Netflix theme
      toggleTheme: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        
        // Apply theme class to document root - this is the correct approach for Tailwind
        document.documentElement.classList.toggle('dark', newMode);
      },
      initializeTheme: () => {
        const { isDarkMode } = get();
        // Apply theme class to document root - this is the correct approach for Tailwind
        document.documentElement.classList.toggle('dark', isDarkMode);
      }
    }),
    {
      name: 'netflix-theme-storage',
      onRehydrateStorage: () => (state) => {
        // Initialize theme on app load
        if (state) {
          state.initializeTheme();
        }
      }
    }
  )
);

export default useThemeStore;