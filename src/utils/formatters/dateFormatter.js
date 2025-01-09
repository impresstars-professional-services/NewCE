export const formatDate = (date, options = {}) => {
  if (!date) return ''
  
  try {
    const defaultOptions = {
      dateStyle: 'medium',
      timeStyle: 'short'
    }
    
    return new Date(date).toLocaleString(undefined, { ...defaultOptions, ...options })
  } catch (error) {
    console.error('Date formatting error:', error)
    return String(date)
  }
}

export const formatDateOnly = (date) => {
  return formatDate(date, { dateStyle: 'medium' })
}

export const formatTimeOnly = (date) => {
  return formatDate(date, { timeStyle: 'short' })
}

export const getRelativeTime = (date) => {
  try {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const now = new Date()
    const diff = new Date(date) - now
    
    const days = Math.round(diff / (1000 * 60 * 60 * 24))
    if (Math.abs(days) < 30) return rtf.format(days, 'day')
    
    const months = Math.round(days / 30)
    return rtf.format(months, 'month')
  } catch (error) {
    console.error('Relative time formatting error:', error)
    return formatDate(date)
  }
}