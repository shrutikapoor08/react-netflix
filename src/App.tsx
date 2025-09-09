import "./App.css";
import { usePopularMovies } from "./lib/usePopularMovies";

import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";

import type { Movie } from "./types";



const App: React.FC = () => {
  const { movies, error, loading } = usePopularMovies();

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <main>
        <div className="container mx-auto">
          {loading && <p className="px-4 md:px-6">Loading...</p>}
          {error && <p className="text-red-500 px-4 md:px-6">{error}</p>}
          <h2 className="text-xl md:text-2xl font-semibold px-4 md:px-6 mb-4 pt-8">Trending Now</h2>
          {movies && <MovieList movies={movies} />}
        </div>
      </main>
    </div>
  );
}

export default App;