import React from 'react';
import MoviePlayer from './MoviePlayer';
import { Link, useParams } from '@tanstack/react-router';
import { useMovieDetail } from '@/lib/useMovieDetail';
import movieData from '../data/movies.json';



const MovieDetail: React.FC = () => {
    const { id: movieId } = useParams({ from: '/movie/$id' });
    const { movie, loading, error } = useMovieDetail(movieId);

    //hack to get movie
    const randomMovie = movieData[Math.floor(Math.random() * movieData.length)];

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }
    if (error) {
        return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
    }
    if (!movie) {
        return <div className="container mx-auto px-4 py-8">Movie not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to='/'>
                <button
                    className="mb-4 px-4 py-2 bg-gray-700 text-white rounded"
                    aria-label="Navigate back to the homepage">
                    Back
                </button>
            </Link>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="mb-2">Release Date: {movie.release_date}</p>
            <p className="mb-2">Rating: {movie.vote_average}</p>
            <p className="mb-4">{movie.overview}</p>
            <MoviePlayer movie={randomMovie} />
        </div >
    );
};

export default MovieDetail;
