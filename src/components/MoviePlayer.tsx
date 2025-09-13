import type { Movie } from "@/types";

interface MoviePlayerProps {
    movie: Movie;
}

const MoviePlayer = ({ movie }: MoviePlayerProps) => {
    return (
        <div className=" bg-black text-white relative">
            <video
                height={"250px"}
                poster={movie.poster_path}
                preload="metadata"
                aria-label="Play movie"
                className="w-full h-auto" controls>
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>


        </div >
    );
};


export default MoviePlayer;
