import { vehicleApi } from '../../../services/api'

export default {
  async fetchVehicles({ commit, rootGetters }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await vehicleApi.getVehicles(userId)
      if (result.success) {
        commit('SET_VEHICLES', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to fetch vehicles')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createVehicle({ commit, rootGetters }, vehicleData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await vehicleApi.createVehicle(userId, vehicleData)
      if (result.success) {
        commit('ADD_VEHICLE', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to create vehicle')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateVehicle({ commit, rootGetters }, { id, data }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootGetters['auth/currentUser']?.id
      if (!userId) throw new Error('User not authenticated')

      const result = await vehicleApi.updateVehicle(userId, id, data)
      if (result.success) {
        commit('UPDATE_VEHICLE', result.data)
        return result
      }
      throw new Error(result.error || 'Failed to update vehicle')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteVehicle({ commit }, vehicleId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await vehicleApi.deleteVehicle(vehicleId)
      if (result.success) {
        commit('REMOVE_VEHICLE', vehicleId)
        return result
      }
      throw new Error(result.error || 'Failed to delete vehicle')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  }
}