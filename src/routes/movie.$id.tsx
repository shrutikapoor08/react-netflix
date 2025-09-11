import MovieDetail from '@/components/MovieDetail'
import { createFileRoute } from '@tanstack/react-router'

const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
const API_URL = "https://api.themoviedb.org/3/movie/";
import { createServerFn } from '@tanstack/react-start'



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
export const Route = createFileRoute('/movie/$id')({
  loader: async ({ params }) => {
    return getMovieById(params?.id)

  }, component: MovieDetailPage,
})

function MovieDetailPage() {
  const { video } = Route.useLoaderData();
  return <MovieDetail movie={video} />

}

