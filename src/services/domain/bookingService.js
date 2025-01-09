import { apiService } from '../api'
import { validateBooking } from '../../utils/bookingUtils'
import { calculateBookingTotal } from '../../utils/bookingUtils'

export const bookingService = {
  async getBookings(userId) {
    try {
      const result = await apiService.getUserData(userId)
      return result.success ? result.data.bookings : []
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  },

  async createBooking(userId, bookingData) {
    if (!validateBooking(bookingData)) {
      throw new Error('Invalid booking data')
    }

    const total = calculateBookingTotal(bookingData.serviceType, bookingData.duration)
    const bookingWithTotal = { ...bookingData, total }

    try {
      return await apiService.createBooking(userId, bookingWithTotal)
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  },

  async cancelBooking(userId, bookingId) {
    try {
      return await apiService.updateBooking(userId, bookingId, {
        status: 'Cancelled',
        cancelledAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error cancelling booking:', error)
      throw error
    }
  }
}