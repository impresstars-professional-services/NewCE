/**
 * Calculate notification metrics
 * @param {Array} notifications - List of notifications
 * @returns {Object} Notification metrics
 */
export const calculateNotificationMetrics = (notifications = []) => {
  return {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    byType: notifications.reduce((acc, notification) => {
      const type = notification.type || 'unknown'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {}),
    byPriority: notifications.reduce((acc, notification) => {
      const priority = notification.priority || 'low'
      acc[priority] = (acc[priority] || 0) + 1
      return acc
    }, {})
  }
}