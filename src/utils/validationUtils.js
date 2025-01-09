// Add new validation functions
export const validateUserData = (data) => {
  const required = ['firstName', 'lastName', 'email', 'phone']
  return required.every(field => data[field]?.trim())
}

export const validateWorkerData = (data) => {
  const required = ['name', 'level', 'certifications']
  return required.every(field => {
    if (Array.isArray(data[field])) {
      return data[field].length > 0
    }
    return data[field]?.trim()
  })
}

export const validateBooking = (data) => {
  const required = ['serviceType', 'date', 'addressId']
  return required.every(field => data[field])
}