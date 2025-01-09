export const validateAddress = (address) => {
  if (!address || typeof address !== 'object') {
    return false
  }

  const required = ['street', 'city', 'state', 'zipCode']
  const isValid = required.every(field => {
    const value = address[field]
    return value && typeof value === 'string' && value.trim().length > 0
  })

  if (!isValid) return false

  // Validate ZIP code format
  const zipRegex = /^\d{5}(-\d{4})?$/
  if (!zipRegex.test(address.zipCode)) {
    return false
  }

  // Validate state code
  const stateRegex = /^[A-Z]{2}$/
  if (!stateRegex.test(address.state)) {
    return false
  }

  return true
}

export const validateAddressFields = (address) => {
  const errors = {}
  
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
  
  return errors
}