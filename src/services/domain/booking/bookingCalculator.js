/**
 * Calculate booking total price
 */
export const calculateBookingTotal = (serviceType, duration = 1, extras = []) => {
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

/**
 * Calculate estimated duration based on service type and parameters
 */
export const calculateEstimatedDuration = (serviceType, size = 'medium') => {
  const baseDurations = {
    'House Cleaning': 3,
    'Commercial Cleaning': 4,
    'Vehicle Detailing': 2,
    'Carpet Cleaning': 2
  }

  const sizeMultipliers = {
    small: 0.75,
    medium: 1,
    large: 1.5
  }

  const baseDuration = baseDurations[serviceType] || 2
  const multiplier = sizeMultipliers[size] || 1

  return Math.ceil(baseDuration * multiplier)
}