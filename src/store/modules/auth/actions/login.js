import { apiService } from '../../../../services/api'
import { storage } from '../../../../services/storage'
import { showSuccessNotification } from '../../../../utils/notificationUtils'

export const loginAction = async ({ commit }, credentials) => {
  commit('SET_LOADING', true)
  commit('SET_ERROR', null)
  
  try {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required')
    }

    const result = await apiService.login(credentials)
    if (!result.success) {
      throw new Error(result.error || 'Login failed')
    }

    const { user } = result.data
    storage.set('userData', user)
    commit('SET_USER', user)
    
    showSuccessNotification('Successfully logged in!')
    return { success: true, data: user }
  } catch (error) {
    commit('SET_ERROR', error.message)
    return { success: false, error: error.message }
  } finally {
    commit('SET_LOADING', false)
  }
}