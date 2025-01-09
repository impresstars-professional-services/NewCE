export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {})
}

export const omit = (obj, keys) => {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key]
      return result
    }, {})
}

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }

  return Object.keys(obj).reduce((result, key) => {
    result[key] = deepClone(obj[key])
    return result
  }, {})
}

export const merge = (target, ...sources) => {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      const targetValue = target[key]
      const sourceValue = source[key]

      if (Array.isArray(sourceValue)) {
        target[key] = sourceValue.slice()
      } else if (sourceValue && typeof sourceValue === 'object') {
        target[key] = merge(
          targetValue && typeof targetValue === 'object' ? targetValue : {},
          sourceValue
        )
      } else {
        target[key] = sourceValue
      }
    })
  })

  return target
}