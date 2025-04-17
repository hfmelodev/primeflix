import { API } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

interface MovieProps {
  id: number
  title: string
  overview: string
  poster_path: string
}

interface MovieResponse {
  results: MovieProps[]
}

export function Home() {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      const response = await API.get<MovieResponse>('/movie/now_playing')

      setMovies(response.data.results.slice(0, 10))
      setIsLoading(false)
    }

    fetchMovies()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-auto flex-col space-y-4 bg-slate-100">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-slate-300 rounded-full" />
          <div className="absolute inset-0 border-t-4 border-slate-800 rounded-full animate-spin" />
        </div>
        <h1 className="text-slate-700 text-lg font-semibold">
          Carregando filmes...
        </h1>
      </div>
    )
  }

  return (
    <>
      <Helmet title="Home" />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            🎬 Em cartaz
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => (
              <article
                key={movie.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[360px] object-cover"
                />

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-4 flex-1">
                    {movie.overview}
                  </p>
                </div>

                <Link
                  to={`/movies/${movie.id}`}
                  className="bg-slate-800 text-white px-6 py-2 rounded-b-2xl font-medium text-center shadow hover:bg-slate-700 transition"
                >
                  Ver detalhes
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
