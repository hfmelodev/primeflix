import { Route, Routes as Router } from 'react-router'
import { AppLayout } from './_layouts/app'
import { NotFound } from './not-found'
import { Home } from './pages/home'

export function Routes() {
  return (
    <Router>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="mypage" element={<h1>MyPage</h1>} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Router>
  )
}
