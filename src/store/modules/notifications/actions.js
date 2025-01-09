import { notificationService } from '../../../services/domain/notification'

export default {
  async initialize({ commit }) {
    commit('SET_INITIALIZED', true)
    return { success: true }
  },

  async fetchNotifications({ commit, rootState }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const userId = rootState.auth.user?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await notificationService.getNotifications(userId)
      if (result.success) {
        commit('SET_NOTIFICATIONS', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to fetch notifications')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async sendNotification({ commit, rootState }, notification) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootState.auth.user?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await notificationService.sendNotification(userId, notification)
      if (result.success) {
        commit('ADD_NOTIFICATION', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to send notification')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async markAsRead({ commit, rootState }, notificationId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootState.auth.user?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await notificationService.markAsRead(userId, notificationId)
      if (result.success) {
        commit('MARK_AS_READ', notificationId)
        return result
      }
      throw new Error(result.error || 'Failed to mark notification as read')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  resetState({ commit }) {
    commit('RESET_STATE')
    return { success: true }
  }
}