import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient