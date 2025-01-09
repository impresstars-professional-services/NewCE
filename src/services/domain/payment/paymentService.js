import { validatePayment } from './paymentValidator'
import { apiService } from '../../api'
import { handleError } from '../../../utils/errorHandler'

export const paymentService = {
  /**
   * Process a payment
   */
  async processPayment(userId, bookingId, paymentDetails) {
    try {
      const validation = validatePayment(paymentDetails)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid payment details',
          validationErrors: validation.errors 
        }
      }

      const result = await apiService.processPayment(userId, bookingId, paymentDetails)
      return result
    } catch (error) {
      return handleError(error, 'Failed to process payment')
    }
  },

  /**
   * Get payment methods for a user
   */
  async getPaymentMethods(userId) {
    try {
      const result = await apiService.getPaymentMethods(userId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to fetch payment methods')
    }
  },

  /**
   * Save payment method
   */
  async savePaymentMethod(userId, paymentMethod) {
    try {
      const validation = validatePayment(paymentMethod)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid payment method',
          validationErrors: validation.errors 
        }
      }

      const result = await apiService.addPaymentMethod(userId, paymentMethod)
      return result
    } catch (error) {
      return handleError(error, 'Failed to save payment method')
    }
  }
}