import { calculateNotificationMetrics } from '../../../services/domain/notification'

export default {
  allNotifications: state => state.notifications,
  unreadNotifications: state => state.notifications.filter(n => !n.read),
  unreadCount: state => state.notifications.filter(n => !n.read).length,
  isLoading: state => state.loading,
  error: state => state.error,
  isInitialized: state => state.initialized,
  notificationMetrics: state => calculateNotificationMetrics(state.notifications)
}