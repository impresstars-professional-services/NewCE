import { validateNotification } from './notificationValidator'
import { apiService } from '../../api'
import { handleError } from '../../../utils/errorHandler'

export const notificationService = {
  /**
   * Send a notification
   */
  async sendNotification(userId, notification) {
    try {
      const validation = validateNotification(notification)
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'Invalid notification data',
          validationErrors: validation.errors 
        }
      }

      const result = await apiService.sendNotification(userId, notification)
      return result
    } catch (error) {
      return handleError(error, 'Failed to send notification')
    }
  },

  /**
   * Get notifications for a user
   */
  async getNotifications(userId) {
    try {
      const result = await apiService.getNotifications(userId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to fetch notifications')
    }
  },

  /**
   * Mark notification as read
   */
  async markAsRead(userId, notificationId) {
    try {
      const result = await apiService.markNotificationAsRead(userId, notificationId)
      return result
    } catch (error) {
      return handleError(error, 'Failed to mark notification as read')
    }
  }
}