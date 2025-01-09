import { validateAddress } from './addressValidator'
import { validateVehicle } from './vehicleValidator'

export const validateBooking = (booking) => {
  if (!booking || typeof booking !== 'object') {
    return false
  }

  const required = ['serviceType', 'date', 'addressId']
  const isValid = required.every(field => booking[field])

  if (!isValid) return false

  // Validate date
  const bookingDate = new Date(booking.date)
  const now = new Date()
  if (isNaN(bookingDate.getTime()) || bookingDate < now) {
    return false
  }

  // Validate address if provided
  if (booking.address && !validateAddress(booking.address)) {
    return false
  }

  // Validate vehicle for vehicle detailing service
  if (booking.serviceType === 'Vehicle Detailing') {
    if (!booking.vehicleId || (booking.vehicle && !validateVehicle(booking.vehicle))) {
      return false
    }
  }

  return true
}

export const validateBookingFields = (booking) => {
  const errors = {}
  const now = new Date()

  if (!booking.serviceType) {
    errors.serviceType = 'Service type is required'
  }

  if (!booking.date) {
    errors.date = 'Date is required'
  } else {
    const bookingDate = new Date(booking.date)
    if (isNaN(bookingDate.getTime())) {
      errors.date = 'Invalid date'
    } else if (bookingDate < now) {
      errors.date = 'Cannot book in the past'
    }
  }

  if (!booking.addressId) {
    errors.addressId = 'Address is required'
  }

  if (booking.serviceType === 'Vehicle Detailing' && !booking.vehicleId) {
    errors.vehicleId = 'Vehicle is required for detailing service'
  }

  return errors
}