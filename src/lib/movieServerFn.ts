import { createServerFn } from '@tanstack/start'

const API_URL = 'your-api-url-here' // Replace with your actual API URL
const token = 'your-token-here' // Replace with your actual token

export const getMovies = createServerFn('GET', async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const movies = await response.json();
    console.log({ movies });
    return { movies };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Movies fetch failed: ${errorMessage}`);
  }
})

export const getMovieById = createServerFn('GET', async (id: string) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }

    const video = await response.json();
    console.log({ video });
    return { video };
  } catch (error) {
    // Properly handle the error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Movie fetch failed: ${errorMessage}`);
  }
})