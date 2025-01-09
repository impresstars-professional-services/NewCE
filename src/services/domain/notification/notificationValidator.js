/**
 * Validates notification data
 * @param {Object} notification - The notification to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateNotification = (notification) => {
  const errors = {}

  if (!notification || typeof notification !== 'object') {
    return { isValid: false, errors: { general: 'Invalid notification data' } }
  }

  // Required fields validation
  if (!notification.type?.trim()) {
    errors.type = 'Notification type is required'
  } else {
    const validTypes = ['booking', 'payment', 'system', 'reminder']
    if (!validTypes.includes(notification.type)) {
      errors.type = 'Invalid notification type'
    }
  }

  if (!notification.message?.trim()) {
    errors.message = 'Message is required'
  }

  if (notification.priority) {
    const validPriorities = ['low', 'medium', 'high']
    if (!validPriorities.includes(notification.priority)) {
      errors.priority = 'Invalid priority level'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}