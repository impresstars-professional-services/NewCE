/**
 * Format vehicle display string
 * @param {Object} vehicle - The vehicle to format
 * @returns {string} Formatted vehicle string
 */
export const formatVehicleDisplay = (vehicle) => {
  if (!vehicle) return ''
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.color}`
}

/**
 * Get vehicle type display name
 * @param {string} type - The vehicle type
 * @returns {string} Display name for vehicle type
 */
export const getVehicleTypeDisplay = (type) => {
  const types = {
    sedan: 'Sedan',
    suv: 'SUV',
    truck: 'Truck',
    van: 'Van',
    motorcycle: 'Motorcycle'
  }
  return types[type?.toLowerCase()] || type
}