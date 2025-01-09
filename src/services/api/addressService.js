import { axiosInstance } from './axiosInstance'
import { handleError } from '../../utils/errorHandler'
import { validateAddress } from '../../utils/validators/addressValidator'

export const addressService = {
  /**
   * Get addresses for a user
   */
  async getAddresses(userId) {
    try {
      const response = await axiosInstance.get(`/users/${userId}/addresses`)
      return { success: true, data: response.data }
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

      const method = addressData.id ? 'put' : 'post'
      const url = addressData.id 
        ? `/users/${userId}/addresses/${addressData.id}`
        : `/users/${userId}/addresses`
      
      const response = await axiosInstance[method](url, addressData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleError(error, 'Failed to save address')
    }
  },

  /**
   * Delete an address
   */
  async deleteAddress(userId, addressId) {
    try {
      await axiosInstance.delete(`/users/${userId}/addresses/${addressId}`)
      return { success: true }
    } catch (error) {
      return handleError(error, 'Failed to delete address')
    }
  },

  /**
   * Calculate address metrics
   */
  calculateAddressMetrics(addresses = []) {
    return {
      total: addresses.length,
      byType: addresses.reduce((acc, address) => {
        acc[address.type] = (acc[address.type] || 0) + 1
        return acc
      }, {})
    }
  }
}