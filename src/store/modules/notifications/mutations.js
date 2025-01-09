export default {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications.unshift(notification)
  },
  MARK_AS_READ(state, notificationId) {
    const notification = state.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_INITIALIZED(state, initialized) {
    state.initialized = initialized
  },
  RESET_STATE(state) {
    state.notifications = []
    state.loading = false
    state.error = null
    state.initialized = false
  }
}