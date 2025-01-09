import { bookingApi } from '../../../services/api'

export default {
  async fetchBookings({ commit, rootGetters }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await bookingApi.getBookings(userId)
      if (result.success) {
        commit('SET_BOOKINGS', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to fetch bookings')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createBooking({ commit, rootGetters }, bookingData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await bookingApi.createBooking(userId, bookingData)
      if (result.success) {
        commit('ADD_BOOKING', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to create booking')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateBooking({ commit, rootGetters }, { id, data }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await bookingApi.updateBooking(userId, id, data)
      if (result.success) {
        commit('UPDATE_BOOKING', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to update booking')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  }
}