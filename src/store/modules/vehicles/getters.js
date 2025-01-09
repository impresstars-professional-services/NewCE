export default {
  allVehicles: state => state.vehicles,
  isLoading: state => state.loading,
  error: state => state.error,
  isInitialized: state => state.initialized,
  getVehicleById: state => id => state.vehicles.find(v => v.id === id)
}