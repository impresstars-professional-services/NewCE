import { validateVehicle } from './vehicleValidator'
import { apiService } from '../../api'
import { handleError } from '../../../utils/errorHandler'

export const vehicleService = {
  /**
   * Get vehicles for a user
   */
  async getVehicles(userId) {
    try {
      const result = await apiService.getVehicles(userId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to fetch vehicles')
    }
  },

  /**
   * Save (create or update) a vehicle
   */
  async saveVehicle(userId, vehicleData) {
    try {
      const validation = validateVehicle(vehicleData)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid vehicle data',
          validationErrors: validation.errors 
        }
      }

      const result = await apiService.saveVehicle(userId, vehicleData)
      return result
    } catch (error) {
      return handleError(error, 'Failed to save vehicle')
    }
  },

  /**
   * Delete a vehicle
   */
  async deleteVehicle(userId, vehicleId) {
    try {
      const result = await apiService.deleteVehicle(userId, vehicleId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to delete vehicle')
    }
  }
}