import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import { useEffect, useState } from "react";
import { TMDBResponse, MovieData } from "./types";

const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

async function fetchPopularMovies(): Promise<TMDBResponse> {

  const token = import.meta.env.VITE_TMDB_AUTH_TOKEN
  if (!token) {
    throw new Error('Missing TMDB_AUTH_TOKEN environment variable')
  }

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

  const data = (await response.json()) as TMDBResponse
  console.log(data)
  return data
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<TMDBResponse | null>(null);

  useEffect(() => {
    async function getMovies() {
      const movies = await fetchPopularMovies();
      setMovies(movies);
      console.log(movies);
    }

    getMovies();
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
          <h2 className="text-2xl font-semibold px-4 md:px-6 mb-4 pt-8">Trending Now</h2>
          {movies?.length > 0 && <MovieList movies={movies?.results} onMovieClick={handleMovieClick} />}
        </div>
      </main>
    </div>

  );
}

export default App;