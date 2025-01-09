export default {
  SET_PAYMENT_METHODS(state, methods) {
    state.paymentMethods = methods
  },
  ADD_PAYMENT_METHOD(state, method) {
    state.paymentMethods.push(method)
  },
  UPDATE_PAYMENT_METHOD(state, updatedMethod) {
    const index = state.paymentMethods.findIndex(m => m.id === updatedMethod.id)
    if (index !== -1) {
      state.paymentMethods.splice(index, 1, updatedMethod)
    }
  },
  REMOVE_PAYMENT_METHOD(state, methodId) {
    state.paymentMethods = state.paymentMethods.filter(m => m.id !== methodId)
  },
  ADD_TRANSACTION(state, transaction) {
    state.transactions.push(transaction)
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
    state.paymentMethods = []
    state.transactions = []
    state.loading = false
    state.error = null
    state.initialized = false
  }
}