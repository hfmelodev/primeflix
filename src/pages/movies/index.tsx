import { Button } from '@/components/ui/button'
import { API } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

interface MoviesParams {
  [key: string]: string | undefined
  id: string
}

interface MovieResponse {
  id: number
  title: string
  overview: string
  backdrop_path: string
  release_date: string
}

export function Movies() {
  const { id } = useParams<MoviesParams>()
  const navigate = useNavigate()

  const [movieDetails, setMovieDetails] = useState<MovieResponse>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await API.get<MovieResponse>(`/movie/${id}`)

        setMovieDetails(response.data)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.log(`Filme não encontrado: ${err}`)
        navigate('/', {
          replace: true,
        })
      }
    }

    fetchMovieDetails()
  }, [id, navigate])

  if (isLoading || !movieDetails) {
    return (
      <div className="flex items-center justify-center my-auto flex-col space-y-4 bg-slate-100">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-slate-300 rounded-full" />
          <div className="absolute inset-0 border-t-4 border-slate-800 rounded-full animate-spin" />
        </div>
        <h1 className="text-slate-700 text-lg font-semibold">
          Carregando detalhes...
        </h1>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className="w-full lg:w-1/3 h-[450px] object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between flex-1">
          <h1 className="text-3xl font-semibold text-slate-900">
            {movieDetails.title}
          </h1>

          <p className="text-sm text-slate-600 mt-4">{movieDetails.overview}</p>

          <p className="text-sm text-slate-500 mt-2">
            Lançamento: {movieDetails.release_date}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mt-6">
            <Button className="bg-slate-800 text-white hover:bg-slate-700 transition">
              ⭐ Favoritar
            </Button>
            <a
              href={`https://www.youtube.com/results?search_query=${movieDetails.title}+Trailer`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-slate-800 text-white hover:bg-slate-700 transition">
                🎬 Ver Trailer
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
