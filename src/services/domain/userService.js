import { apiService } from '../api'
import { validateUserData } from '../../utils/validationUtils'

export const userService = {
  async updateProfile(userId, profileData) {
    if (!validateUserData(profileData)) {
      throw new Error('Invalid profile data')
    }

    try {
      return await apiService.updateUserProfile(userId, profileData)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  async upgradeToCommercial(userId) {
    try {
      return await apiService.updateUserProfile(userId, {
        accountType: 'Commercial',
        accountHistory: [{
          type: 'Commercial',
          timestamp: new Date().toISOString()
        }]
      })
    } catch (error) {
      console.error('Error upgrading account:', error)
      throw error
    }
  }
}