import axios from 'axios'
import axiosRetry from 'axios-retry'
import { axiosConfig } from './config/axiosConfig'
import { setupInterceptors } from './config/interceptors'

// Create axios instance with base configuration
const axiosInstance = axios.create(axiosConfig)

// Configure retry behavior
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.response?.status === 429 // Rate limiting
  }
})

// Set up interceptors
setupInterceptors(axiosInstance)

export { axiosInstance }