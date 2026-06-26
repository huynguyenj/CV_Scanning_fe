import type { AxiosError, AxiosInstance } from "axios"
import axios from "axios"
import { authStore } from "../feature/goolge-login/store/auth-store"
import type { ApiResponseError } from "../types/ApiResponse"

const BASE_URL = import.meta.env.VITE_API_URL

export const apiPrivate: AxiosInstance = axios.create({
      baseURL: BASE_URL
})

apiPrivate.interceptors.request.use((config) => {
   const accessToken = authStore.getState().accessToken
   if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
   return config
}, error => Promise.reject(error))

apiPrivate.interceptors.response.use((response) => {
      return response.data
}, (error: AxiosError) => {
      const apiResponseError = error.response?.data as ApiResponseError
      if (apiResponseError.code === 'TOKEN_EXPIRED' || apiResponseError.code === 'UNAUTHORIZED')
            authStore.getState().removeAuthInfo()
      return Promise.reject(apiResponseError.message)
})