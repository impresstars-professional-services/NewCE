import { store } from '../../../store'
import { handleError } from '../../../utils/errorHandler'
import { showErrorNotification } from '../../../utils/notificationUtils'

export const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getters['auth/token']
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // Handle token expiration
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          await store.dispatch('auth/refreshToken')
          const token = store.getters['auth/token']
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          await store.dispatch('auth/logout')
          showErrorNotification('Your session has expired. Please log in again.')
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(handleError(error))
    }
  )
}