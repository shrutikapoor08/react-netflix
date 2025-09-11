import React, { useEffect } from 'react';
import MoviePlayer from './MoviePlayer';
import { Link } from '@tanstack/react-router';
import movieData from '../data/movies.json';

interface MovieDetailProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    overview: string;
    poster_path?: string;
    backdrop_path?: string;
  };
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {

  const randomMovie = movieData[Math.floor(Math.random() * movieData.length)];

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link to="/">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/">
        <button
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          aria-label="Navigate back to the homepage"
        >
          ← Back
        </button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-300">
            <span className="bg-gray-800 px-3 py-1 rounded">
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </span>
            <span className="bg-yellow-600 px-3 py-1 rounded text-black font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Watch Trailer</h2>
            <MoviePlayer movie={randomMovie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;