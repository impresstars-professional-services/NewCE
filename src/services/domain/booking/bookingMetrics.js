/**
 * Calculate booking metrics
 * @param {Array} bookings - List of bookings
 * @returns {Object} Booking metrics
 */
export const calculateBookingMetrics = (bookings = []) => {
  const metrics = {
    total: bookings.length,
    completed: 0,
    cancelled: 0,
    pending: 0,
    totalRevenue: 0,
    averageRating: 0
  }

  const ratings = []

  bookings.forEach(booking => {
    switch (booking.status) {
      case 'Completed':
        metrics.completed++
        metrics.totalRevenue += booking.total || 0
        if (booking.rating) ratings.push(booking.rating)
        break
      case 'Cancelled':
        metrics.cancelled++
        break
      case 'Pending':
        metrics.pending++
        break
    }
  })

  metrics.averageRating = ratings.length ? 
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 
    0

  metrics.completionRate = metrics.total ? 
    (metrics.completed / metrics.total) * 100 : 
    0

  metrics.cancellationRate = metrics.total ? 
    (metrics.cancelled / metrics.total) * 100 : 
    0

  return metrics
}