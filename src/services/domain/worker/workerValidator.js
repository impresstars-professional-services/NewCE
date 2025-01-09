/**
 * Validates worker data
 * @param {Object} worker - The worker to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateWorker = (worker) => {
  const errors = {}

  if (!worker || typeof worker !== 'object') {
    return { isValid: false, errors: { general: 'Invalid worker data' } }
  }

  // Required fields validation
  if (!worker.name?.trim()) {
    errors.name = 'Name is required'
  }

  if (!worker.level?.trim()) {
    errors.level = 'Level is required'
  } else {
    const validLevels = ['Junior', 'Intermediate', 'Senior', 'Expert']
    if (!validLevels.includes(worker.level)) {
      errors.level = 'Invalid worker level'
    }
  }

  if (!Array.isArray(worker.certifications) || worker.certifications.length === 0) {
    errors.certifications = 'At least one certification is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}