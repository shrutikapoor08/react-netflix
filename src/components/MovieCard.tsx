import React, { useState } from 'react';

import { Badge } from "@/components/ui/badge"
import { Star, Play } from "lucide-react"
import { Card } from './ui/card';
import type { MovieCardProps } from '@/types';

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 bg-card p-0 border-0 md:min-w-[180px] w-[7rem]"
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMovieClick(movie)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onMovieClick(movie);
        }
      }}
    >
      <img
        src={TMDB_IMAGES_ASSET_URL + movie?.poster_path || "/placeholder.svg"}
        alt={movie?.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-10"
      />

      {/* Overlay on hover */}
      <div
        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="text-center text-white p-4">
          <Play className="w-12 h-12 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Watch Now</p>
        </div>
      </div>

      {/* Rating badge */}
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="bg-black/70 text-white border-none">
          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </Badge>
      </div>
    </Card >
  );

};


export default MovieCard;