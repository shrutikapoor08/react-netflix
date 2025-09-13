import React from 'react';
import { Link } from '@tanstack/react-router';
import { Star, Play, Plus, ArrowLeft } from 'lucide-react';
import { Badge } from './ui/badge';
import styles from './MovieDetail.module.css';

interface MovieDetailProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    overview: string;
    poster_path?: string;
    backdrop_path?: string;
    runtime?: number;
    genres?: Array<{ id: number; name: string }>;
    production_companies?: Array<{ id: number; name: string }>;
    spoken_languages?: Array<{ iso_639_1: string; name: string }>;
  };
}

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";
const TMDB_BACKDROP_URL = "https://image.tmdb.org/t/p/w1280/";

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  if (!movie) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Movie not found</h1>
          <p className={styles.notFoundMessage}>
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className={styles.backButton}>
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
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>
        <ArrowLeft size={16} />
        Back to Movies
      </Link>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        {movie.backdrop_path && (
          <img
            src={TMDB_BACKDROP_URL + movie.backdrop_path}
            alt={`${movie.title} backdrop`}
            className={styles.backdropImage}
          />
        )}
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.contentGrid}>
            {/* Poster */}
            <div className={styles.posterSection}>
              <img
                src={TMDB_IMAGES_ASSET_URL + movie.poster_path}
                alt={`${movie.title} poster`}
                className={styles.posterImage}
                placeholder="/placeholder-movie.svg"
              />
            </div>

            {/* Movie Info */}
            <div className={styles.movieInfo}>
              <h1 className={styles.movieTitle}>{movie.title}</h1>

              <div className={styles.movieMeta}>
                <span className={styles.releaseYear}>{releaseYear}</span>

                <div className={styles.rating}>
                  <div className={styles.ratingStars}>
                    {'★'.repeat(ratingStars)}{'☆'.repeat(5 - ratingStars)}
                  </div>
                  <span className={styles.ratingValue}>{rating}</span>
                </div>

                {movie.runtime && (
                  <Badge variant="secondary" className="bg-black/60 text-white border-none">
                    {formatRuntime(movie.runtime)}
                  </Badge>
                )}
              </div>

              {movie.overview && (
                <p className={styles.overview}>{movie.overview}</p>
              )}

              <div className={styles.actionButtons}>
                <button className={styles.playButton}>
                  <Play size={20} fill="white" />
                  Play Movie
                </button>
                <button className={styles.secondaryButton}>
                  <Plus size={20} />
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className={styles.detailsSection}>
        <h2 className={styles.sectionTitle}>Movie Details</h2>

        <div className={styles.movieDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Release Date</span>
            <span className={styles.detailValue}>
              {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Rating</span>
            <span className={styles.detailValue}>{rating}/10</span>
          </div>

          {movie.runtime && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Duration</span>
              <span className={styles.detailValue}>{formatRuntime(movie.runtime)}</span>
            </div>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Genres</span>
              <span className={styles.detailValue}>
                {movie.genres.map(genre => genre.name).join(', ')}
              </span>
            </div>
          )}

          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Languages</span>
              <span className={styles.detailValue}>
                {movie.spoken_languages.map(lang => lang.name).join(', ')}
              </span>
            </div>
          )}

          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Production</span>
              <span className={styles.detailValue}>
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