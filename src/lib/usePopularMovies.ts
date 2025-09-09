import { useState, useEffect } from "react";
import type { TMDBResponse, Movie } from "@/types";

const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

export function usePopularMovies() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPopularMovies() {
      const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
      if (!token) {
        setError('Missing TMDB_AUTH_TOKEN environment variable');
        setLoading(false);
        return;
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
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.statusText}`);
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

  return { movies, error, loading };
}
