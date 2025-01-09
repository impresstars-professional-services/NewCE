import { validateVehicle } from '../../../utils/validators/vehicleValidator'
import { validateAddress } from '../../../utils/validators/addressValidator'

/**
 * Validates booking data
 * @param {Object} booking - The booking to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateBooking = (booking) => {
  const errors = {}

  if (!booking || typeof booking !== 'object') {
    return { isValid: false, errors: { general: 'Invalid booking data' } }
  }

  // Required fields
  if (!booking.serviceType?.trim()) {
    errors.serviceType = 'Service type is required'
  }

  if (!booking.date) {
    errors.date = 'Date is required'
  } else {
    const bookingDate = new Date(booking.date)
    if (isNaN(bookingDate.getTime())) {
      errors.date = 'Invalid date'
    } else if (bookingDate < new Date()) {
      errors.date = 'Cannot book in the past'
    }
  }

  if (!booking.addressId) {
    errors.addressId = 'Address is required'
  }

  // Vehicle validation for vehicle detailing service
  if (booking.serviceType === 'Vehicle Detailing') {
    if (!booking.vehicleId) {
      errors.vehicleId = 'Vehicle is required for detailing service'
    }
    if (booking.vehicle) {
      const vehicleValidation = validateVehicle(booking.vehicle)
      if (!vehicleValidation.isValid) {
        errors.vehicle = vehicleValidation.errors
      }
    }
  }

  // Address validation if provided
  if (booking.address) {
    const addressValidation = validateAddress(booking.address)
    if (!addressValidation.isValid) {
      errors.address = addressValidation.errors
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}