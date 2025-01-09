/**
 * Validates vehicle data
 * @param {Object} vehicle - The vehicle to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateVehicle = (vehicle) => {
  const errors = {}

  if (!vehicle || typeof vehicle !== 'object') {
    return { isValid: false, errors: { general: 'Invalid vehicle data' } }
  }

  // Required fields validation
  if (!vehicle.make?.trim()) {
    errors.make = 'Make is required'
  }

  if (!vehicle.model?.trim()) {
    errors.model = 'Model is required'
  }

  if (!vehicle.year) {
    errors.year = 'Year is required'
  } else {
    const year = parseInt(vehicle.year)
    const currentYear = new Date().getFullYear()
    if (isNaN(year) || year < 1900 || year > currentYear + 1) {
      errors.year = 'Invalid year'
    }
  }

  if (!vehicle.color?.trim()) {
    errors.color = 'Color is required'
  }

  if (!vehicle.type?.trim()) {
    errors.type = 'Vehicle type is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}