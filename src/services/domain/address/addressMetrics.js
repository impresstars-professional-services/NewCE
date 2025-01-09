/**
 * Calculate address metrics
 * @param {Array} addresses - List of addresses
 * @returns {Object} Address metrics
 */
export const calculateAddressMetrics = (addresses = []) => {
  return {
    total: addresses.length,
    byType: addresses.reduce((acc, address) => {
      const type = address.type?.toLowerCase() || 'other'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {}),
    byState: addresses.reduce((acc, address) => {
      if (address.state) {
        acc[address.state] = (acc[address.state] || 0) + 1
      }
      return acc
    }, {})
  }
}