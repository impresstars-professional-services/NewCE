import { validateBooking } from './bookingValidator'
import { calculateBookingTotal, calculateEstimatedDuration } from './bookingCalculator'
import { apiService } from '../../api'
import { handleError } from '../../../utils/errorHandler'

export const bookingService = {
  /**
   * Create a new booking
   */
  async createBooking(userId, bookingData) {
    try {
      const validation = validateBooking(bookingData)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid booking data',
          validationErrors: validation.errors 
        }
      }

      const duration = calculateEstimatedDuration(
        bookingData.serviceType, 
        bookingData.size
      )

      const total = calculateBookingTotal(
        bookingData.serviceType,
        duration,
        bookingData.extras
      )

      const booking = {
        ...bookingData,
        userId,
        duration,
        total,
        status: 'Pending',
        createdAt: new Date().toISOString()
      }

      const result = await apiService.createBooking(userId, booking)
      return result

    } catch (error) {
      return handleError(error, 'Failed to create booking')
    }
  },

  /**
   * Cancel a booking
   */
  async cancelBooking(userId, bookingId) {
    try {
      const result = await apiService.updateBooking(userId, bookingId, {
        status: 'Cancelled',
        cancelledAt: new Date().toISOString()
      })
      return result
    } catch (error) {
      return handleError(error, 'Failed to cancel booking')
    }
  }
}