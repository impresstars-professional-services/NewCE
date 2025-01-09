import { validateVehicle } from '../../utils/validators/vehicleValidator'

export function useVehicleValidation() {
  const validateVehicleData = (vehicleData) => {
    const errors = {}
    
    if (!vehicleData.make?.trim()) {
      errors.make = 'Make is required'
    }
    
    if (!vehicleData.model?.trim()) {
      errors.model = 'Model is required'
    }
    
    if (!vehicleData.year) {
      errors.year = 'Year is required'
    } else {
      const year = parseInt(vehicleData.year)
      const currentYear = new Date().getFullYear()
      if (isNaN(year) || year < 1900 || year > currentYear + 1) {
        errors.year = 'Invalid year'
      }
    }
    
    if (!vehicleData.color?.trim()) {
      errors.color = 'Color is required'
    }
    
    if (!vehicleData.type?.trim()) {
      errors.type = 'Vehicle type is required'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  return {
    validateVehicleData
  }
}