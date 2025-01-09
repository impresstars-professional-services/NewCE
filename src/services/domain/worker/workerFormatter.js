/**
 * Format worker display string
 * @param {Object} worker - The worker to format
 * @returns {string} Formatted worker string
 */
export const formatWorkerDisplay = (worker) => {
  if (!worker) return ''
  return `${worker.name} - ${worker.level}`
}

/**
 * Get worker level display name
 * @param {string} level - The worker level
 * @returns {string} Display name for worker level
 */
export const getWorkerLevelDisplay = (level) => {
  const levels = {
    junior: 'Junior Worker',
    intermediate: 'Intermediate Worker',
    senior: 'Senior Worker',
    expert: 'Expert Worker'
  }
  return levels[level?.toLowerCase()] || level
}