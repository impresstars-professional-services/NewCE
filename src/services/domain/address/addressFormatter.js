/**
 * Format address for display
 * @param {Object} address - The address to format
 * @returns {string} Formatted address string
 */
export const formatAddressDisplay = (address) => {
  if (!address) return ''
  
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode
  ].filter(Boolean)
  
  return parts.join(', ')
}

/**
 * Get address type display name
 * @param {string} type - The address type
 * @returns {string} Display name for address type
 */
export const getAddressTypeDisplay = (type) => {
  const types = {
    home: 'Home Address',
    work: 'Work Address',
    other: 'Other Address'
  }
  return types[type?.toLowerCase()] || types.other
}