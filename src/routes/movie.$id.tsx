import MovieDetail from '@/components/MovieDetail'
import { createFileRoute } from '@tanstack/react-router'
import { getMovieById } from '@/lib/movieServerFn'

export const Route = createFileRoute('/movie/$id')({
  loader: async ({ params }) => {
    if (!params?.id) {
      throw new Error('Movie ID is required')
    }
    console.log({ params })
    return await getMovieById({
      data: params.id
    })
  },
  component: MovieDetailPage,
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Movie</h1>
      <p className="text-red-400">{error.message}</p>
    </div>
  ),
})

function MovieDetailPage() {
  const { video } = Route.useLoaderData()
  return <MovieDetail movie={video} />
}