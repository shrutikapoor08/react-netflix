import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  imageBaseUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, imageBaseUrl }) => {
  return (
    <div className="movie-card" key={movie.id}>
      <div
        className="movie-image"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${imageBaseUrl}${movie.backdrop_path})`
            : "none",
        }}
        role="img"
      />

      <div className="movie-header">
        <p className="movie-title">{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;