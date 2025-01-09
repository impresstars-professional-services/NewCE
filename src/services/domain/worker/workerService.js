import { validateWorker } from './workerValidator'
import { apiService } from '../../api'
import { handleError } from '../../../utils/errorHandler'

export const workerService = {
  /**
   * Get worker profile
   */
  async getProfile(workerId) {
    try {
      const result = await apiService.getWorkerData(workerId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to fetch worker profile')
    }
  },

  /**
   * Update worker profile
   */
  async updateProfile(workerId, profileData) {
    try {
      const validation = validateWorker(profileData)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid worker data',
          validationErrors: validation.errors 
        }
      }

      const result = await apiService.updateWorkerProfile(workerId, profileData)
      return result
    } catch (error) {
      return handleError(error, 'Failed to update worker profile')
    }
  },

  /**
   * Get available jobs for worker
   */
  async getAvailableJobs(workerId) {
    try {
      const result = await apiService.getAvailableJobs(workerId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to fetch available jobs')
    }
  }
}