```javascript
import { BaseService } from './baseService'
import { apiService } from '../api'
import { validateVehicle } from '../../utils/validators/vehicleValidator'
import { createError } from '../../utils/errorHandler'

class VehicleService extends BaseService {
  constructor() {
    super('Vehicle')
  }

  async getVehicles(userId) {
    return this.executeServiceCall('getVehicles', async () => {
      if (!userId) {
        throw createError('User ID is required', 'VALIDATION_ERROR')
      }

      const result = await apiService.getVehicles(userId)
      if (!result.success) {
        throw createError(result.error || 'Failed to fetch vehicles', 'API_ERROR')
      }

      return result
    })
  }

  async saveVehicle(userId, vehicleData) {
    return this.executeServiceCall('saveVehicle', async () => {
      if (!userId) {
        throw createError('User ID is required', 'VALIDATION_ERROR')
      }

      if (!validateVehicle(vehicleData)) {
        throw createError('Invalid vehicle data', 'VALIDATION_ERROR')
      }

      const result = await apiService.saveVehicle(userId, vehicleData)
      if (!result.success) {
        throw createError(result.error || 'Failed to save vehicle', 'API_ERROR')
      }

      return result
    })
  }

  async deleteVehicle(userId, vehicleId) {
    return this.executeServiceCall('deleteVehicle', async () => {
      if (!userId || !vehicleId) {
        throw createError('User ID and Vehicle ID are required', 'VALIDATION_ERROR')
      }

      const result = await apiService.deleteVehicle(userId, vehicleId)
      if (!result.success) {
        throw createError(result.error || 'Failed to delete vehicle', 'API_ERROR')
      }

      return result
    })
  }
}

export const vehicleService = new VehicleService()
```