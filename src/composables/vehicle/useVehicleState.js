import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export function useVehicleState() {
  const store = useStore()
  
  const vehicles = computed(() => store.getters['vehicles/allVehicles'])
  const isLoading = computed(() => store.getters['vehicles/isLoading'])
  const error = computed(() => store.getters['vehicles/error'])

  return {
    vehicles,
    isLoading,
    error
  }
}