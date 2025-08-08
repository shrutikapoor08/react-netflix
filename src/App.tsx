import "./App.css";
import { MovieData } from "./types";

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

const MOVIE_DATA: MovieData = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/AuUAB6bHEltolSvbBslfNSgsRIm.jpg",
      genre_ids: [14, 28, 80],
      id: 268,
      original_language: "en",
      original_title: "Batman",
      overview:
        'Batman must face his most ruthless nemesis when a deformed madman calling himself "The Joker" seizes control of Gotham\'s criminal underworld.',
      popularity: 7.4146,
      poster_path: "/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg",
      release_date: "1989-06-21",
      title: "Batman",
      video: false,
      vote_average: 7.233,
      vote_count: 8132,
    },
    {
      adult: false,
      backdrop_path: "/nOWOU0bdX76iF9XA1YPlInLbI4Y.jpg",
      genre_ids: [28, 35, 80],
      id: 2661,
      original_language: "en",
      original_title: "Batman",
      overview:
        "The Dynamic Duo faces four super-villains who plan to hold the world for ransom with the help of a secret invention that instantly dehydrates people.",
      popularity: 2.0992,
      poster_path: "/zzoPxWHnPa0eyfkMLgwbNvdEcVF.jpg",
      release_date: "1966-07-30",
      title: "Batman",
      video: false,
      vote_average: 6.4,
      vote_count: 991,
    },
    {
      adult: false,
      backdrop_path: "/bHxJA9rllKF2jhb11ARAwZJYSp6.jpg",
      genre_ids: [28, 12, 80, 878, 53, 10752],
      id: 125249,
      original_language: "en",
      original_title: "Batman",
      overview:
        "Japanese master spy Daka operates a covert espionage-sabotage organization located in Gotham City's now-deserted Little Tokyo, which turns American scientists into pliable zombies. The great crime-fighters Batman and Robin, with the help of their allies, are in pursuit.",
      popularity: 1.4435,
      poster_path: "/AvzD3mrtokIzZOiV6zAG7geIo6F.jpg",
      release_date: "1943-07-16",
      title: "Batman",
      video: false,
      vote_average: 6.378,
      vote_count: 115,
    },
    {
      adult: false,
      backdrop_path: "/e807jDKiFcntZS32ze88X6I96OD.jpg",
      genre_ids: [16, 28],
      id: 1297763,
      original_language: "ja",
      original_title: "ニンジャバットマン対ヤクザリーグ",
      overview:
        "The Batman family has returned to the present to discover that Japan has disappeared, and a giant island - Hinomoto - is now in the sky over Gotham City.  At the top sit the Yakuza, a group of superpowered individuals who reign without honor or humanity and look suspiciously like the Justice League. Now, it’s up to Batman and his allies to save Gotham!",
      popularity: 15.2261,
      poster_path: "/sVVT6GYFErVv0Lcc9NvqCu0iOxO.jpg",
      release_date: "2025-03-17",
      title: "Batman Ninja vs. Yakuza League",
      video: false,
      vote_average: 6.686,
      vote_count: 188,
    },
    {
      adult: false,
      backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
      genre_ids: [80, 9648, 53],
      id: 414906,
      original_language: "en",
      original_title: "The Batman",
      overview:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
      popularity: 23.7013,
      poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      release_date: "2022-03-01",
      title: "The Batman",
      video: false,
      vote_average: 7.7,
      vote_count: 11055,
    },
  ],
  total_pages: 10,
  total_results: 195,
};

const App: React.FC = () => {
  return (
    <>
      <h1> Netflix </h1>
      <div className="movie-carousel">
        {MOVIE_DATA?.results?.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div
              className="movie-image"
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(${TMDB_IMAGES_ASSET_URL}${movie.backdrop_path})`
                  : "none",
              }}
              role="img"
            />

            <div className="movie-header">
              <p className="movie-title">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;