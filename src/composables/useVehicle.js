```javascript
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNotification } from './useNotification'
import { validateVehicle } from '../utils/validators/vehicleValidator'

export function useVehicle() {
  const store = useStore()
  const notification = useNotification()
  const isLoading = ref(false)
  const error = ref(null)

  const vehicles = computed(() => store.getters['vehicles/allVehicles'])

  const saveVehicle = async (vehicleData) => {
    if (!validateVehicle(vehicleData)) {
      const errorMsg = 'Invalid vehicle data'
      notification.showError(errorMsg)
      return { success: false, error: errorMsg }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await store.dispatch('vehicles/saveVehicle', vehicleData)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result
    } catch (err) {
      const errorMsg = err.message || 'Failed to save vehicle'
      error.value = errorMsg
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deleteVehicle = async (vehicleId) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await store.dispatch('vehicles/deleteVehicle', vehicleId)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete vehicle'
      error.value = errorMsg
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  return {
    vehicles,
    isLoading,
    error,
    saveVehicle,
    deleteVehicle
  }
}
```