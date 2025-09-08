import "./App.css";
import { MovieData } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import { useEffect, useState } from "react";



const App: React.FC = () => {
  const { movies, setMovies } = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data: MovieData = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }
    fetchData();

  }, []);


  const handleMovieClick = (movie: MovieData["results"][number]) => {
    // Handle movie click event, e.g., show details or log to console
    console.log("Movie clicked:", movie);
  };



  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <main>
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold px-4 md:px-6 mb-4 pt-8">Trending Now</h2>
          <MovieList movies={MOVIE_DATA.results} onMovieClick={handleMovieClick} />
        </div>
      </main>
    </div>
  );
};

export default App;