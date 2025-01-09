import { apiService } from '../../services/api'

export default {
  namespaced: true,

  state: () => ({
    loading: false,
    error: null
  }),

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async updateProfile({ commit, dispatch, rootGetters }, profileData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const userId = rootGetters['auth/currentUser']?.id
        if (!userId) {
          throw new Error('User not authenticated')
        }

        const result = await apiService.updateProfile(userId, profileData)
        if (result.success) {
          await dispatch('auth/updateUser', result.data, { root: true })
          return result
        }
        throw new Error(result.error || 'Failed to update profile')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    isLoading: state => state.loading,
    error: state => state.error
  }
}