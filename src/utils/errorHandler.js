import { showErrorNotification } from './notificationUtils'

export class AppError extends Error {
  constructor(message, code, data = {}) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.data = data
  }
}

export const handleError = (error, options = {}) => {
  const { silent = false, context = '' } = options
  
  // Log error
  console.error(`${context} Error:`, error)

  // Format error message
  const message = error instanceof AppError 
    ? error.message
    : error.response?.data?.message || error.message || 'An unexpected error occurred'

  // Show notification unless silent
  if (!silent) {
    showErrorNotification(message)
  }

  return {
    success: false,
    error: message,
    code: error.code || 'UNKNOWN_ERROR',
    data: error.data
  }
}

export const createError = (message, code = 'APP_ERROR', data = {}) => {
  return new AppError(message, code, data)
}