/**
 * Validates payment data
 * @param {Object} payment - The payment to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validatePayment = (payment) => {
  const errors = {}

  if (!payment || typeof payment !== 'object') {
    return { isValid: false, errors: { general: 'Invalid payment data' } }
  }

  // Card number validation
  if (!payment.cardNumber?.trim()) {
    errors.cardNumber = 'Card number is required'
  } else {
    const cardNumber = payment.cardNumber.replace(/\D/g, '')
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      errors.cardNumber = 'Invalid card number length'
    }
  }

  // Expiration validation
  const now = new Date()
  const expYear = parseInt(payment.expirationYear)
  const expMonth = parseInt(payment.expirationMonth)

  if (!expYear || !expMonth) {
    errors.expiration = 'Expiration date is required'
  } else if (
    expYear < now.getFullYear() || 
    (expYear === now.getFullYear() && expMonth < (now.getMonth() + 1))
  ) {
    errors.expiration = 'Card has expired'
  }

  // CVV validation
  if (!payment.cvv?.trim()) {
    errors.cvv = 'CVV is required'
  } else if (!/^\d{3,4}$/.test(payment.cvv)) {
    errors.cvv = 'Invalid CVV'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}