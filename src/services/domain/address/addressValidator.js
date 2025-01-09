/**
 * Validates address data
 * @param {Object} address - The address to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateAddress = (address) => {
  const errors = {}

  if (!address || typeof address !== 'object') {
    return { isValid: false, errors: { general: 'Invalid address data' } }
  }

  // Required fields validation
  if (!address.street?.trim()) {
    errors.street = 'Street address is required'
  }

  if (!address.city?.trim()) {
    errors.city = 'City is required'
  }

  if (!address.state?.trim()) {
    errors.state = 'State is required'
  } else if (!/^[A-Z]{2}$/.test(address.state)) {
    errors.state = 'Invalid state code'
  }

  if (!address.zipCode?.trim()) {
    errors.zipCode = 'ZIP code is required'
  } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
    errors.zipCode = 'Invalid ZIP code format'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}