/**
 * Calculate payment metrics
 * @param {Array} payments - List of payments
 * @returns {Object} Payment metrics
 */
export const calculatePaymentMetrics = (payments = []) => {
  return {
    totalAmount: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
    count: payments.length,
    byMethod: payments.reduce((acc, payment) => {
      const method = payment.method || 'unknown'
      acc[method] = (acc[method] || 0) + 1
      return acc
    }, {}),
    byStatus: payments.reduce((acc, payment) => {
      const status = payment.status || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})
  }
}