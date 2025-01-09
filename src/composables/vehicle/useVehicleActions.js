import { useStore } from 'vuex'
import { useNotification } from '../useNotification'
import { vehicleService } from '../../services/api/vehicleService'

export function useVehicleActions() {
  const store = useStore()
  const notification = useNotification()

  const saveVehicle = async (vehicleData) => {
    try {
      const userId = store.getters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await vehicleService.saveVehicle(userId, vehicleData)
      if (result.success) {
        notification.showSuccess(
          vehicleData.id ? 'Vehicle updated successfully' : 'Vehicle added successfully'
        )
        await store.dispatch('vehicles/fetchVehicles')
      }
      return result
    } catch (error) {
      notification.showError(error.message)
      return { success: false, error: error.message }
    }
  }

  const deleteVehicle = async (vehicleId) => {
    try {
      const userId = store.getters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await vehicleService.deleteVehicle(userId, vehicleId)
      if (result.success) {
        notification.showSuccess('Vehicle deleted successfully')
        await store.dispatch('vehicles/fetchVehicles')
      }
      return result
    } catch (error) {
      notification.showError(error.message)
      return { success: false, error: error.message }
    }
  }

  return {
    saveVehicle,
    deleteVehicle
  }
}