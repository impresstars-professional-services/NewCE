/**
 * Calculate vehicle metrics
 * @param {Array} vehicles - List of vehicles
 * @returns {Object} Vehicle metrics
 */
export const calculateVehicleMetrics = (vehicles = []) => {
  return {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'Active').length,
    byType: vehicles.reduce((acc, vehicle) => {
      const type = vehicle.type?.toLowerCase() || 'other'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {}),
    byMake: vehicles.reduce((acc, vehicle) => {
      if (vehicle.make) {
        acc[vehicle.make] = (acc[vehicle.make] || 0) + 1
      }
      return acc
    }, {})
  }
}