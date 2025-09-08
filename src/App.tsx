import "./App.css";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";

import { TMDBResponse, MovieData, Movie } from "./types";

const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'


const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    async function fetchPopularMovies() {

      const token = import.meta.env.VITE_TMDB_AUTH_TOKEN
      if (!token) {
        throw new Error('Missing TMDB_AUTH_TOKEN environment variable')
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          API_URL,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.statusText}`)
        }

        const data = (await response.json()) as TMDBResponse;
        setMovies(data.results);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }

    }
    fetchPopularMovies();
  }, []);

  const handleMovieClick = (movie: MovieData["results"][number]) => {
    // Handle movie click event, e.g., show details or log to console
    console.log("Movie clicked:", movie);
  };



  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <main>
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold px-4 md:px-6 mb-4 pt-8">Trending Now</h2>
          {loading && <p className="px-4 md:px-6">Loading...</p>}
          {error && <p className="text-red-500 px-4 md:px-6">{error}</p>}
          {movies && <MovieList movies={movies} onMovieClick={handleMovieClick} />}
        </div>
      </main>
    </div>

  );
}

export default App;