import { useVehicleState } from './useVehicleState'
import { useVehicleActions } from './useVehicleActions'
import { useVehicleValidation } from './useVehicleValidation'

export function useVehicle() {
  const { vehicles, isLoading, error } = useVehicleState()
  const { saveVehicle, deleteVehicle } = useVehicleActions()
  const { validateVehicleData } = useVehicleValidation()

  return {
    // State
    vehicles,
    isLoading,
    error,
    
    // Actions
    saveVehicle,
    deleteVehicle,
    
    // Validation
    validateVehicleData
  }
}

// Export the composable as default and named export
export default useVehicle