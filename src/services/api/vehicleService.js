import { axiosInstance } from './axiosInstance'
import { handleError } from '../../utils/errorHandler'
import { validateVehicle } from '../../utils/validators/vehicleValidator'

export const vehicleService = {
  /**
   * Get vehicles for a user
   */
  async getVehicles(userId) {
    try {
      const response = await axiosInstance.get(`/users/${userId}/vehicles`)
      return { success: true, data: response.data }
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

      const method = vehicleData.id ? 'put' : 'post'
      const url = vehicleData.id 
        ? `/users/${userId}/vehicles/${vehicleData.id}`
        : `/users/${userId}/vehicles`
      
      const response = await axiosInstance[method](url, vehicleData)
      return { success: true, data: response.data }
    } catch (error) {
      return handleError(error, 'Failed to save vehicle')
    }
  },

  /**
   * Delete a vehicle
   */
  async deleteVehicle(userId, vehicleId) {
    try {
      await axiosInstance.delete(`/users/${userId}/vehicles/${vehicleId}`)
      return { success: true }
    } catch (error) {
      return handleError(error, 'Failed to delete vehicle')
    }
  },

  /**
   * Calculate vehicle metrics
   */
  calculateVehicleMetrics(vehicles = []) {
    return {
      total: vehicles.length,
      active: vehicles.filter(v => v.status === 'Active').length,
      byType: vehicles.reduce((acc, vehicle) => {
        acc[vehicle.type] = (acc[vehicle.type] || 0) + 1
        return acc
      }, {})
    }
  }
}