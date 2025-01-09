import { storage } from '../../../../services/storage'

export const initializeAction = async ({ commit }) => {
  try {
    // Load user data from storage
    const userData = storage.get('userData')
    if (userData) {
      commit('SET_USER', userData)
    }
    
    commit('SET_INITIALIZED', true)
    return { success: true }
  } catch (error) {
    console.error('Auth initialization error:', error)
    return { success: false, error: error.message }
  }
}