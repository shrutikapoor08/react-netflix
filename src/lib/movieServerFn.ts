import { createServerFn } from '@tanstack/react-start'

const API_URL = 'https://api.themoviedb.org/3/movie'
const token = import.meta.env.VITE_TMDB_AUTH_TOKEN

export const getMovies = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    const response = await fetch(`${API_URL}/popular`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const movies = await response.json();
    // const movies = data.results;
    return { movies };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Movies fetch failed: ${errorMessage}`);
  }
})

export const getMovieById = createServerFn({
  method: 'GET',
})
  .handler(async ({ data }) => {
    console.log({ data })
    const id = data;
    try {
      const response = await fetch(`${API_URL}/${id}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log({ response })

      if (!response.ok) {
        throw new Error(`Failed to fetch movie: ${response.statusText}`);
      }

      const video = await response.json();
      console.log({ video });
      return { video };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Movie fetch failed: ${errorMessage}`);
    }
  })

