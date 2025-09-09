import type { Movie } from "@/types";

interface MoviePlayerProps {
    movie: Movie;
}

const MoviePlayer = ({ movie }: MoviePlayerProps) => {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <video
                aria-label="Play movie"
                className="w-full h-auto" controls autoPlay>
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
export default MoviePlayer;
