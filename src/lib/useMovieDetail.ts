import { useEffect, useState } from "react";
import type { Movie } from "@/types";

const API_URL = "https://api.themoviedb.org/3/movie/";

export function useMovieDetail(movieId: string | number) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;
    async function fetchMovieDetail() {
      const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
      if (!token) {
        setError("Missing TMDB_AUTH_TOKEN environment variable");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}${movieId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movie: ${response.statusText}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetail();
  }, [movieId]);

  return { movie, loading, error };
}
