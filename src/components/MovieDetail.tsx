import React from 'react';
import { Link } from '@tanstack/react-router';
import { Star, Play, Plus, ArrowLeft } from 'lucide-react';
import { Badge } from './ui/badge';
import MoviePlayer from './MoviePlayer';
import type { Movie } from '@/types';

interface MovieDetailProps {
  movie?: Movie | null;
}

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";
const TMDB_BACKDROP_URL = "https://image.tmdb.org/t/p/w1280/";

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  if (!movie) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-24 min-h-screen bg-background text-foreground">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie not found</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white/10 text-foreground border border-border rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 no-underline hover:bg-white/20 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const ratingStars = movie.vote_average ? Math.round(movie.vote_average / 2) : 0;

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-24 min-h-screen bg-background text-foreground">
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-white/10 text-foreground border border-border rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 mb-8 mt-6 no-underline hover:bg-white/20 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
      >
        <ArrowLeft size={16} />
        Back to Movies
      </Link>

      {/* Hero Section */}
      <div className="relative min-h-[60vh] rounded-xl overflow-hidden mb-10 bg-gradient-to-br from-[#141414] to-[#2f2f2f]">
        {movie.backdrop_path && (
          <img
            src={TMDB_BACKDROP_URL + movie.backdrop_path}
            alt={`${movie.title} backdrop`}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80" />

        <div className="relative z-10 p-10 lg:p-15 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr] gap-10 lg:gap-10 xl:gap-10 items-start w-full">
            {/* Poster */}
            <div className="lg:sticky lg:top-25 max-w-xs mx-auto lg:mx-0">
              <img
                src={TMDB_IMAGES_ASSET_URL + movie.poster_path}
                alt={`${movie.title} poster`}
                className="w-full aspect-[2/3] object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-movie.svg";
                }}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                {movie.title}
              </h1>

              <div className="flex items-center gap-6 mb-6 flex-wrap">
                <span className="text-lg text-white/80 font-medium">{releaseYear}</span>

                <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <div className="text-yellow-400 text-lg">
                    {'★'.repeat(ratingStars)}{'☆'.repeat(5 - ratingStars)}
                  </div>
                  <span className="text-white font-semibold text-lg">{rating}</span>
                </div>

                {movie.runtime && (
                  <Badge variant="secondary" className="bg-black/60 text-white border-none">
                    {formatRuntime(movie.runtime)}
                  </Badge>
                )}
              </div>

              {movie.overview && (
                <p className="text-lg leading-relaxed text-white/90 mb-8 max-w-2xl">
                  {movie.overview}
                </p>
              )}

              <div className="flex gap-4 mb-8 flex-wrap">
                <button className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 rounded-lg px-7 py-3.5 text-base font-medium cursor-pointer transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5">
                  <Plus size={20} />
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MoviePlayer movie={movie} />

      </div>

      {/* Details Section */}
      <div className="bg-card border border-border rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-card-foreground mb-6 font-['Poppins']">
          Movie Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Release Date
            </span>
            <span className="text-base text-card-foreground font-medium">
              {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Rating
            </span>
            <span className="text-base text-card-foreground font-medium">{rating}/10</span>
          </div>

          {movie.runtime && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Duration
              </span>
              <span className="text-base text-card-foreground font-medium">{formatRuntime(movie.runtime)}</span>
            </div>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Genres
              </span>
              <span className="text-base text-card-foreground font-medium">
                {movie.genres.map(genre => genre.name).join(', ')}
              </span>
            </div>
          )}

          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Languages
              </span>
              <span className="text-base text-card-foreground font-medium">
                {movie.spoken_languages.map(lang => lang.name).join(', ')}
              </span>
            </div>
          )}

          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Production
              </span>
              <span className="text-base text-card-foreground font-medium">
                {movie.production_companies.slice(0, 3).map(company => company.name).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;