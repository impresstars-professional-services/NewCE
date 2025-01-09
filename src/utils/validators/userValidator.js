export const validateUserData = (user) => {
  if (!user || typeof user !== 'object') {
    return false
  }

  const required = ['firstName', 'lastName', 'email', 'phone']
  const isValid = required.every(field => {
    const value = user[field]
    return value && typeof value === 'string' && value.trim().length > 0
  })

  if (!isValid) return false

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(user.email)) {
    return false
  }

  // Validate phone format
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!phoneRegex.test(user.phone)) {
    return false
  }

  return true
}

export const validateUserFields = (user) => {
  const errors = {}

  if (!user.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!user.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (!user.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = 'Invalid email format'
  }

  if (!user.phone?.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!/^\+?[\d\s-]{10,}$/.test(user.phone)) {
    errors.phone = 'Invalid phone number format'
  }

  return errors
}