import { apiService } from '../../../../services/api'
import { storage } from '../../../../services/storage'
import { showSuccessNotification } from '../../../../utils/notificationUtils'

export const updateProfileAction = async ({ commit }, profileData) => {
  commit('SET_LOADING', true)
  commit('SET_ERROR', null)

  try {
    const result = await apiService.updateUserProfile(profileData)
    if (!result.success) {
      throw new Error(result.error || 'Failed to update profile')
    }

    storage.set('userData', result.data)
    commit('SET_USER', result.data)
    showSuccessNotification('Profile updated successfully')
    
    return { success: true, data: result.data }
  } catch (error) {
    commit('SET_ERROR', error.message)
    return { success: false, error: error.message }
  } finally {
    commit('SET_LOADING', false)
  }
}