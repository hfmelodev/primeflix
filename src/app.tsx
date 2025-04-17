import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { Routes } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | PrimeFlix" />
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
