import { useEffect } from "react";
import useThemeStore from "../store/themeStore";
import Hero from "./Hero";
import MovieList from "./MovieList";
import type { Movie } from "../types";

interface HomePageProps {
  movies: Movie[];
}

const HomePage: React.FC<HomePageProps> = ({ movies }) => {
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Hero />
      <main>
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
      </main>
    </div>
  );
};

export default HomePage;