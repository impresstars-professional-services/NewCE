/**
 * Calculate worker metrics
 * @param {Object} worker - Worker data including bookings and reviews
 * @returns {Object} Worker metrics
 */
export const calculateWorkerMetrics = (worker = {}) => {
  const bookings = worker.bookings || []
  const reviews = worker.reviews || []

  return {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.status === 'Completed').length,
    averageRating: reviews.length ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length :
      0,
    totalEarnings: bookings.reduce((sum, booking) => {
      return booking.status === 'Completed' ? sum + (booking.workerEarnings || 0) : sum
    }, 0),
    efficiency: calculateWorkerEfficiency(bookings),
    certifications: worker.certifications?.length || 0
  }
}

/**
 * Calculate worker efficiency
 * @param {Array} bookings - List of worker's bookings
 * @returns {number} Efficiency percentage
 */
const calculateWorkerEfficiency = (bookings = []) => {
  const completedBookings = bookings.filter(b => b.status === 'Completed')
  if (!completedBookings.length) return 0

  const efficiency = completedBookings.reduce((sum, booking) => {
    const estimatedDuration = booking.estimatedDuration || 0
    const actualDuration = booking.actualDuration || estimatedDuration
    return sum + (estimatedDuration / actualDuration)
  }, 0)

  return (efficiency / completedBookings.length) * 100
}