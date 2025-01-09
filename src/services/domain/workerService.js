import { apiService } from '../api'
import { validateWorkerData } from '../../utils/validationUtils'

export const workerService = {
  async getProfile(workerId) {
    try {
      return await apiService.getWorkerData(workerId)
    } catch (error) {
      console.error('Error fetching worker profile:', error)
      throw error
    }
  },

  async updateProfile(workerId, profileData) {
    if (!validateWorkerData(profileData)) {
      throw new Error('Invalid worker data')
    }

    try {
      return await apiService.updateWorkerProfile(workerId, profileData)
    } catch (error) {
      console.error('Error updating worker profile:', error)
      throw error
    }
  },

  async getAvailableJobs(workerId) {
    try {
      return await apiService.getAvailableJobs(workerId)
    } catch (error) {
      console.error('Error fetching available jobs:', error)
      throw error
    }
  }
}