import { useState } from "react";
import "./App.css";

const MOVIE_DATA = {
  adult: false,
  backdrop_path: "/tVBsgjJ37KSuB4dUQAAqfc7h5Jf.jpg",
  genre_ids: [99],
  id: 141559,
  original_language: "en",
  original_title: "Legends of the Dark Knight: The History of Batman",
  overview:
    "A brief history of the DC Comics character Batman, created by Bob Kane in 1939.",
  popularity: 0.2649,
  poster_path: "/ijOIT8msWufRPp1OCVIPIaWgvwc.jpg",
  release_date: "2005-11-15",
  title: "Legends of the Dark Knight: The History of Batman",
  video: false,
  vote_average: 7.0,
  vote_count: 14,
};
const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

function App() {
  return (
    <>
      <h1> Netflix </h1>
      <div className="movie-card">
        <div
          className="movie-image"
          style={{
            backgroundImage: `url(${TMDB_IMAGES_ASSET_URL}${MOVIE_DATA.backdrop_path})`,
          }}
        ></div>

        <div className="movie-header">
          <p className="movie-title">{MOVIE_DATA.title}</p>
        </div>
      </div>
    </>
  );
}

export default App;
