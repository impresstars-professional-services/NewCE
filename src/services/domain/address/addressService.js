import { validateAddress } from './addressValidator'
import { apiService } from '../../api'
import { handleError } from '../../../utils/errorHandler'

export const addressService = {
  /**
   * Get addresses for a user
   */
  async getAddresses(userId) {
    try {
      const result = await apiService.getAddresses(userId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to fetch addresses')
    }
  },

  /**
   * Save (create or update) an address
   */
  async saveAddress(userId, addressData) {
    try {
      const validation = validateAddress(addressData)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid address data',
          validationErrors: validation.errors 
        }
      }

      const result = await apiService.saveAddress(userId, addressData)
      return result
    } catch (error) {
      return handleError(error, 'Failed to save address')
    }
  },

  /**
   * Delete an address
   */
  async deleteAddress(userId, addressId) {
    try {
      const result = await apiService.deleteAddress(userId, addressId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to delete address')
    }
  }
}