import { StatusCodes } from 'http-status-codes'

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.status = status
    this.code = code
    this.name = 'ApiError'
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response
    const errorMessage = data?.message || data?.error || 'An error occurred'

    return {
      success: false,
      error: errorMessage,
      status,
      code: error.code
    }
  }

  if (error.request) {
    return {
      success: false,
      error: 'Network error - no response received',
      status: 0,
      code: 'NETWORK_ERROR'
    }
  }

  return {
    success: false,
    error: error.message || 'An unexpected error occurred',
    status: 500,
    code: 'UNKNOWN_ERROR'
  }
}