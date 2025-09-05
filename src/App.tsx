import "./App.css";
import { TMDBResponse, MovieData } from "./types";
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";


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
  return data
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<TMDBResponse | null>(null);

  useEffect(() => {

    async function getMovies() {
      const movies = await fetchPopularMovies();
      setMovies(movies);
    }

    getMovies();
  }, []);
  return (
    <>
      <h1> Netflix </h1>
      <div className="movie-carousel">
        {movies?.results?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            imageBaseUrl={TMDB_IMAGES_ASSET_URL}
          />
        ))}
      </div>
    </>
  );
};

export default App;
