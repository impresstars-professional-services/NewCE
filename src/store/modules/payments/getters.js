import { calculatePaymentMetrics } from '../../../services/domain/payment'

export default {
  allPaymentMethods: state => state.paymentMethods,
  allTransactions: state => state.transactions,
  isLoading: state => state.loading,
  error: state => state.error,
  isInitialized: state => state.initialized,
  defaultPaymentMethod: state => state.paymentMethods.find(m => m.isDefault),
  paymentMetrics: state => calculatePaymentMetrics(state.transactions)
}