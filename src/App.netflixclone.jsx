import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import MovieCard from './components/MovieCard';
import MovieList from './components/MovieList';
import MoviePlayer from './components/MoviePlayer';
import ThemeToggle from './components/ThemeToggle';

// Import CSS modules to ensure they're loaded
import './components/Header.module.css';
import './components/Hero.module.css';
import './components/theme.module.css';

// Mock data for preview
const mockMovies = [
  {
    id: 1,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    vote_average: 8.7,
    release_date: "1999-03-30",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    vote_average: 8.6,
    release_date: "2014-11-07",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    vote_average: 9.0,
    release_date: "2008-07-18",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
  {
    id: 5,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    vote_average: 8.9,
    release_date: "1994-10-14",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  }
];

const mockMovie = {
  id: 1,
  title: "The Matrix",
  poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
  vote_average: 8.7,
  release_date: "1999-03-30",
  overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
};

const NetflixClonePreview = () => {
  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Complete Netflix Clone Preview */}
      <div className="relative">
        <Header />
        <Hero />
        
        <main className="relative z-20 bg-black">
          <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 px-4 text-white">Trending Now</h2>
            <MovieList movies={mockMovies} />
          </div>
        </main>
      </div>

      {/* Component Showcase */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">Component Showcase</h1>
          
          {/* Individual Movie Card */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 px-4 text-white">Movie Card Component</h2>
            <div className="px-4 flex gap-4 flex-wrap">
              {mockMovies.slice(0, 3).map(movie => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
              ))}
            </div>
          </section>

          {/* Theme Toggle Component */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 px-4 text-white">Theme Toggle Component</h2>
            <div className="px-4">
              <ThemeToggle />
            </div>
          </section>

          {/* Movie Detail Component */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 px-4 text-white">Movie Detail Component</h2>
            <div className="bg-black">
              <MovieDetail movie={mockMovie} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NetflixClonePreview;