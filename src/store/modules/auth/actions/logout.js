import { apiService } from '../../../../services/api'
import { storage } from '../../../../services/storage'
import { showSuccessNotification, showErrorNotification } from '../../../../utils/notificationUtils'

export const logoutAction = async ({ commit, dispatch }) => {
  try {
    await apiService.logout()
    
    // Clear all relevant store modules
    await Promise.all([
      dispatch('bookings/resetState', null, { root: true }),
      dispatch('vehicles/resetState', null, { root: true }),
      dispatch('addresses/resetState', null, { root: true })
    ])
    
    commit('RESET_STATE')
    
    // Clear storage
    storage.remove('userData')
    storage.remove('userBookings')
    storage.remove('userVehicles')
    storage.remove('userAddresses')
    
    showSuccessNotification('Successfully logged out!')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    showErrorNotification('Error during logout')
    return { success: false, error: error.message }
  }
}