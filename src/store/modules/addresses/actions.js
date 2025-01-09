import { addressApi } from '../../../services/api'

export default {
  async fetchAddresses({ commit, rootGetters }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await addressApi.getAddresses(userId)
      if (result.success) {
        commit('SET_ADDRESSES', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to fetch addresses')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createAddress({ commit, rootGetters }, addressData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await addressApi.createAddress(userId, addressData)
      if (result.success) {
        commit('ADD_ADDRESS', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to create address')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateAddress({ commit, rootGetters }, { id, data }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await addressApi.updateAddress(userId, id, data)
      if (result.success) {
        commit('UPDATE_ADDRESS', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to update address')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteAddress({ commit }, addressId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await addressApi.deleteAddress(addressId)
      if (result.success) {
        commit('REMOVE_ADDRESS', addressId)
        return result
      }
      throw new Error(result.error || 'Failed to delete address')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  }
}