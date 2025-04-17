import { Route, Routes as Router } from 'react-router'
import { AppLayout } from './_layouts/app'
import { NotFound } from './not-found'
import { Favorites } from './pages/favorites'
import { Home } from './pages/home'
import { Movies } from './pages/movies'

export function Routes() {
  return (
    <Router>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies/:id" element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Router>
  )
}
