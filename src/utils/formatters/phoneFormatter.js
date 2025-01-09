export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  
  try {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    
    return phone
  } catch (error) {
    console.error('Phone formatting error:', error)
    return phone
  }
}

export const parsePhoneInput = (value) => {
  return value.replace(/\D/g, '')