import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'

interface FavoritesResponse {
  id: number
  title: string
  overview: string
  backdrop_path: string
  release_date: string
}

export function Favorites() {
  const [movies, setMovies] = useState<FavoritesResponse[]>([])

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('@primeflix') || '[]')

    setMovies(movies)
  }, [])

  function handleDeleteMovie(movieId: number) {
    try {
      const movies = JSON.parse(localStorage.getItem('@primeflix') || '[]')

      // Busca no array somente os filmes diferentes do que foi clicado
      const filteredMovies = movies.filter((movie: FavoritesResponse) => {
        return movie.id !== movieId
      })

      localStorage.setItem('@primeflix', JSON.stringify(filteredMovies))

      setMovies(filteredMovies)

      toast.success('Filme removido com sucesso!')
    } catch (err) {
      console.log(`Erro ao remover filme: ${err}`)
      toast.error('Erro ao remover filme, tente novamente!')
    }
  }

  return (
    <div className="flex flex-col space-y-4 bg-slate-100">
      <h1 className="text-slate-700 text-2xl font-semibold">
        <span className="text-slate-500 mr-2">🔖</span>
        Favoritos
      </h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border hover:border-slate-500 transition-colors"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-1">
                  {movie.title}
                </h2>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  {movie.overview}
                </p>

                <div className="mt-auto flex items-center justify-end gap-2">
                  <Button
                    variant="destructive"
                    className="text-sm px-4 py-1.5"
                    onClick={() => handleDeleteMovie(movie.id)}
                  >
                    Excluir
                  </Button>
                  <Link to={`/movies/${movie.id}`}>
                    <Button>Ver detalhes</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px] flex-col space-y-4 bg-slate-100">
          <div className="text-slate-400 text-6xl">🎞️</div>
          <h1 className="text-slate-700 text-2xl font-semibold">
            Nenhum favorito por aqui...
          </h1>
          <p className="text-slate-500 text-sm text-center max-w-md">
            Você ainda não adicionou nenhum filme aos favoritos. Que tal
            explorar alguns títulos e salvar seus preferidos?
          </p>
        </div>
      )}
    </div>
  )
}
