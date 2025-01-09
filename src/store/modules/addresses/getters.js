export default {
  allAddresses: state => state.addresses,
  isLoading: state => state.loading,
  error: state => state.error,
  isInitialized: state => state.initialized,
  getAddressById: state => id => state.addresses.find(a => a.id === id)
}