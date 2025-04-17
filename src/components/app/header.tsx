import { Link } from 'react-router'

export function Header() {
  return (
    <header className="flex items-center justify-around py-4 h-14 bg-slate-800 text-white">
      <Link to="/" className="font-bold cursor-pointer text-2xl">
        PrimeFlix
      </Link>

      <Link
        to="/favorites"
        className="cursor-pointer bg-slate-50 py-1.5 px-4 text-slate-800 font-medium hover:bg-slate-200 transition-colors rounded-sm"
      >
        Meus Filmes
      </Link>
    </header>
  )
}
