import { paymentService } from '../../../services/domain/payment'

export default {
  async initialize({ commit }) {
    commit('SET_INITIALIZED', true)
    return { success: true }
  },

  async fetchPaymentMethods({ commit, rootState }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const userId = rootState.auth.user?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await paymentService.getPaymentMethods(userId)
      if (result.success) {
        commit('SET_PAYMENT_METHODS', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to fetch payment methods')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async savePaymentMethod({ commit, rootState }, paymentMethod) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootState.auth.user?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await paymentService.savePaymentMethod(userId, paymentMethod)
      if (result.success) {
        if (paymentMethod.id) {
          commit('UPDATE_PAYMENT_METHOD', result.data)
        } else {
          commit('ADD_PAYMENT_METHOD', result.data)
        }
        return result
      }
      throw new Error(result.error || 'Failed to save payment method')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async processPayment({ commit, rootState }, { bookingId, paymentDetails }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootState.auth.user?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await paymentService.processPayment(userId, bookingId, paymentDetails)
      if (result.success) {
        commit('ADD_TRANSACTION', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to process payment')
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