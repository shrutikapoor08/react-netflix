export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// MovieList Component: Displays a grid of movies
export type MovieListProps = {
  movies: Movie[];
};

export type MovieCardProps = {
  movie: Movie;
  onMovieClick: (movie: any) => void;

} 
 export interface TMDBResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}