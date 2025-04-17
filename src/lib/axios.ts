import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'pt-BR',
  },
})

// Interceptor para adicionar delay de 2 segundos (1000ms)
API.interceptors.request.use(async config => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  return config
})
