const DEFAULT_CURRENCY = 'USD'
const DEFAULT_LOCALE = 'en-US'

export const formatCurrency = (amount, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) => {
  if (typeof amount !== 'number') {
    console.error('Invalid amount for currency formatting:', amount)
    return '$0.00'
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount)
  } catch (error) {
    console.error('Currency formatting error:', error)
    return `$${amount.toFixed(2)}`
  }
}

export const parseCurrencyInput = (value) => {
  if (!value) return 0
  return Number(value.replace(/[^0-9.-]+/g, ''))
}