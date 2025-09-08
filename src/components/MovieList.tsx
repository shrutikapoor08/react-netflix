import { Movie, MovieListProps } from "../types";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
    return (
        <div className="flex overflow-x-auto overflow-y-visible space-x-4 px-4 md:px-6 py-4">
            {movies.map((movie: Movie) => (
                <div key={movie.id}>
                    <MovieCard movie={movie} onMovieClick={onMovieClick} />
                </div>
            ))}
        </div>
    );
};

export default MovieList;
