import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../components/HomePage'
import { getMovies } from '@/lib/movieServerFn'

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      return await getMovies()
    } catch (error) {
      console.error('Failed to load movies:', error)
      return { movies: { results: [] } }
    }
  },
  component: HomePageComponent,
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Movies</h1>
      <p className="text-red-400">{error.message}</p>
    </div>
  ),
})

function HomePageComponent() {
  const { movies } = Route.useLoaderData()
  return <HomePage movies={movies.results || []} />
}