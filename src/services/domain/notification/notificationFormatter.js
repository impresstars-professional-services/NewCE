/**
 * Format notification for display
 * @param {Object} notification - The notification to format
 * @returns {string} Formatted notification string
 */
export const formatNotificationDisplay = (notification) => {
  if (!notification) return ''
  
  const date = new Date(notification.timestamp).toLocaleString()
  return `${notification.message} (${date})`
}

/**
 * Get notification type display name
 * @param {string} type - The notification type
 * @returns {string} Display name for notification type
 */
export const getNotificationTypeDisplay = (type) => {
  const types = {
    booking: 'Booking Update',
    payment: 'Payment Update',
    system: 'System Update',
    reminder: 'Reminder'
  }
  return types[type] || type
}

/**
 * Get notification priority class
 * @param {string} priority - The notification priority
 * @returns {string} CSS class string
 */
export const getNotificationPriorityClass = (priority) => {
  const classes = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return classes[priority] || classes.low
}