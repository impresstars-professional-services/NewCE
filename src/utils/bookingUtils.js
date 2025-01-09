import { validateAddress } from './addressUtils'
import { validateVehicle } from './vehicleUtils'

export const validateBooking = (data) => {
  const required = ['serviceType', 'date', 'addressId']
  const isValid = required.every(field => data[field])

  if (!isValid) return false

  // Validate address if provided
  if (data.address && !validateAddress(data.address)) {
    return false
  }

  // Validate vehicle for vehicle detailing service
  if (data.serviceType === 'Vehicle Detailing') {
    if (!data.vehicleId || (data.vehicle && !validateVehicle(data.vehicle))) {
      return false
    }
  }

  return true
}

export const calculateBookingTotal = (serviceType, duration = 1, extras = []) => {
  if (!serviceType || duration <= 0) {
    throw new Error('Invalid booking parameters')
  }

  const baseRates = {
    'House Cleaning': 50,
    'Commercial Cleaning': 75,
    'Vehicle Detailing': 100,
    'Carpet Cleaning': 60
  }

  const baseRate = baseRates[serviceType]
  if (!baseRate) {
    throw new Error('Invalid service type')
  }

  const extrasTotal = extras.reduce((total, extra) => {
    if (!extra.price || typeof extra.price !== 'number') {
      throw new Error('Invalid extra service price')
    }
    return total + extra.price
  }, 0)

  return baseRate * duration + extrasTotal
}

export const getBookingStatusClass = (status) => {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-indigo-100 text-indigo-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}