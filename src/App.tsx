import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import { useLoaderData } from "@tanstack/react-router";

import Hero from "./components/Hero";
import MovieList from "./components/MovieList";

import type { Movie } from "./types";

interface AppProps {
  serverMovies?: Movie[];
}

const App: React.FC<AppProps> = ({ serverMovies }) => {
  const { isDarkMode, initializeTheme } = useThemeStore();

  // Use server-rendered data if available, otherwise fallback to empty array
  const movies = serverMovies || [];

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <main>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Hero />
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold px-4 md:px-6 mb-4 pt-8">
            Trending Now
          </h2>
          {movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <div className="px-4 md:px-6">
              <p className="text-gray-500">No movies available at the moment.</p>
            </div>
          )}
        </div>
      </div >
    </main>
  );
};

export default App;