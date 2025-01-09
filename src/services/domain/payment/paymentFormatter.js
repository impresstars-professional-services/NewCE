/**
 * Format payment method display
 * @param {Object} payment - The payment method to format
 * @returns {string} Formatted payment string
 */
export const formatPaymentDisplay = (payment) => {
  if (!payment) return ''
  
  const cardNumber = payment.cardNumber.slice(-4)
  return `${payment.cardType} ending in ${cardNumber}`
}

/**
 * Get card type from number
 * @param {string} cardNumber - The card number
 * @returns {string} Card type
 */
export const getCardType = (cardNumber) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/
  }
  
  const cleaned = cardNumber.replace(/\D/g, '')
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) return type
  }
  
  return 'unknown'
}

/**
 * Mask card number for display
 * @param {string} cardNumber - The card number to mask
 * @returns {string} Masked card number
 */
export const maskCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, '')
  return `•••• •••• •••• ${cleaned.slice(-4)}`
}