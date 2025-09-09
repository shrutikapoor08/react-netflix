import { Movie, MovieListProps } from "../types";
import MovieCard from "./MovieCard";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const listRef = useRef<HTMLUListElement>(null);

    const handleScroll = (direction) => {
        const container = listRef.current;
        if (container) {
            const scrollAmount =
                direction === "left" ? -container.clientWidth : container.clientWidth;
            container.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative group flex">
            <button
                onClick={() => handleScroll("left")}
                className="left-0 top-0 bottom-0  bg-black bg-opacity-50 hover:bg-opacity-80 text-white opacity-100 transition-opacity duration-300 flex items-center justify-center z-50 mr-2 p-0"
                style={{}}
            >
                <ChevronLeft size={24} />
            </button>

            <ul
                ref={listRef}
                className="flex overflow-x-auto overflow-y-visible space-x-4 px-4 md:px-6 py-4 scrollbar-hide relative"
            >
                {movies.map((movie: Movie) => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} onMovieClick={onMovieClick} />
                    </li>
                ))}
            </ul>
            <button
                onClick={() => handleScroll("right")}
                className="right-0 top-0 bottom-0 bg-black bg-opacity-50 hover:bg-opacity-80 text-white opacity-100 transition-opacity duration-300 flex items-center justify-center z-50 ml-2 p-0"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default MovieList;
