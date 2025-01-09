/**
 * Format booking display string
 * @param {Object} booking - The booking to format
 * @returns {string} Formatted booking string
 */
export const formatBookingDisplay = (booking) => {
  if (!booking) return ''
  
  const date = new Date(booking.date).toLocaleString()
  return `${booking.serviceType} - ${date}`
}

/**
 * Get status class for booking
 * @param {string} status - The booking status
 * @returns {string} CSS class string
 */
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