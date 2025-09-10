import type { Movie, MovieListProps } from "@/types";
import MovieCard from "./MovieCard";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from '@tanstack/react-router';

const MovieList = ({ movies }: MovieListProps) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const listRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();

    const handleScroll = (direction) => {
        const container = listRef.current;
        if (container) {
            const scrollAmount =
                direction === "left" ? -container.clientWidth : container.clientWidth;
            container.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleMovieClick = (movie: Movie) => {
        navigate({ to: `/movie/${movie.id}` });
    };

    return (
        <div className="relative group flex">
            <button
                onClick={() => handleScroll("left")}
                className="left-0 top-0 bottom-0 bg-black/50 dark:bg-black/50 hover:bg-black/80 dark:hover:bg-black/80 text-white opacity-100 transition-all duration-300 flex items-center justify-center z-50 mr-2 p-0"
            >
                <ChevronLeft size={24} />
            </button>

            <ul
                ref={listRef}
                className="flex overflow-x-auto overflow-y-visible space-x-4 px-4 md:px-6 py-4 scrollbar-hide relative"
            >
                {movies.map((movie: Movie) => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                    </li>
                ))}
            </ul>
            <button
                onClick={() => handleScroll("right")}
                className="right-0 top-0 bottom-0 bg-black/50 dark:bg-black/50 hover:bg-black/80 dark:hover:bg-black/80 text-white opacity-100 transition-all duration-300 flex items-center justify-center z-50 ml-2 p-0"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default MovieList;