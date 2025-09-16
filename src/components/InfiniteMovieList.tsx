import { useState, useCallback, useRef } from "react";
import { getMovies } from "@/lib/movieServerFn";
import type { Movie, MovieData } from "@/types";
import MovieCard from "./MovieCard";
import { useNavigate } from '@tanstack/react-router';
import '../App.css';

interface InfiniteMovieListProps {
  initialMovies: Movie[];
  initialPage: number;
  totalPages: number;
}

const InfiniteMovieList = ({ initialMovies, initialPage, totalPages }: InfiniteMovieListProps) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages);
  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver>();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await getMovies({ data: { page: nextPage } });
      const movieData = response.movies as MovieData;

      setMovies(prev => [...prev, ...movieData.results]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < movieData.total_pages);
    } catch (error) {
      console.error('Failed to load more movies:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage]);

  const lastMovieElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const handleMovieClick = (movie: Movie) => {
    navigate({ to: `/movie/${movie.id}` });
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 md:px-6 py-4">
        {movies.map((movie: Movie, index: number) => (
          <div
            key={`${movie.id}-${index}`}
            ref={index === movies.length - 1 ? lastMovieElementRef : null}
            className="flex-shrink-0"
          >
            <MovieCard movie={movie} onMovieClick={handleMovieClick} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          No more movies to load
        </div>
      )}
    </div>
  );
};

export default InfiniteMovieList;