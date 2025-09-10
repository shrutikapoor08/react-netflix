import MovieDetail from '@/components/MovieDetail'
import { createFileRoute } from '@tanstack/react-router'

const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
const API_URL = "https://api.themoviedb.org/3/movie/";


export const Route = createFileRoute('/movie/$id')({
  loader: async ({ params }) => {

    try {
      const response = await fetch(
        `${API_URL}${params.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch movie: ${response.statusText}`);
      }
      const video = await response.json();
      return { video };
    } catch (error) {
      throw new Error(error)
    }
  }, component: MovieDetailPage,
})

function MovieDetailPage() {
  const { video } = Route.useLoaderData();
  return <MovieDetail movie={video} />

}

