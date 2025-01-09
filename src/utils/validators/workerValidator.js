export const validateWorkerData = (worker) => {
  if (!worker || typeof worker !== 'object') {
    return false
  }

  const required = ['name', 'level', 'certifications']
  const isValid = required.every(field => {
    if (field === 'certifications') {
      return Array.isArray(worker[field]) && worker[field].length > 0
    }
    return worker[field] && typeof worker[field] === 'string' && worker[field].trim().length > 0
  })

  if (!isValid) return false

  // Validate worker level
  const validLevels = ['Junior', 'Intermediate', 'Senior', 'Expert']
  if (!validLevels.includes(worker.level)) {
    return false
  }

  return true
}

export const validateWorkerFields = (worker) => {
  const errors = {}
  const validLevels = ['Junior', 'Intermediate', 'Senior', 'Expert']

  if (!worker.name?.trim()) {
    errors.name = 'Name is required'
  }

  if (!worker.level) {
    errors.level = 'Level is required'
  } else if (!validLevels.includes(worker.level)) {
    errors.level = 'Invalid worker level'
  }

  if (!Array.isArray(worker.certifications) || worker.certifications.length === 0) {
    errors.certifications = 'At least one certification is required'
  }

  return errors
}