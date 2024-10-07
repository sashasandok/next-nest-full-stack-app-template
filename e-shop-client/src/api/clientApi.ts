import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem('token')
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - Redirecting to login')
    } else {
      console.error('Response error:', error.response)
    }
    return Promise.reject(error)
  },
)
