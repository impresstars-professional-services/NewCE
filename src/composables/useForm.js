import { ref, computed } from 'vue'

export function useForm(initialValues = {}, validationSchema = null) {
  const values = ref({ ...initialValues })
  const errors = ref({})
  const touched = ref({})
  const isSubmitting = ref(false)

  const isDirty = computed(() => {
    return Object.keys(values.value).some(key => 
      values.value[key] !== initialValues[key]
    )
  })

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0
  })

  const validate = async () => {
    if (!validationSchema) return true

    try {
      errors.value = {}
      const validationResult = await validationSchema(values.value)
      errors.value = validationResult
      return Object.keys(validationResult).length === 0
    } catch (error) {
      console.error('Validation error:', error)
      return false
    }
  }

  const handleChange = (field, value) => {
    values.value[field] = value
    touched.value[field] = true
    if (validationSchema) {
      validate()
    }
  }

  const handleSubmit = async (submitFn) => {
    isSubmitting.value = true
    try {
      const isValid = await validate()
      if (!isValid) return false

      await submitFn(values.value)
      return true
    } catch (error) {
      console.error('Form submission error:', error)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    values.value = { ...initialValues }
    errors.value = {}
    touched.value = {}
    isSubmitting.value = false
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    isValid,
    handleChange,
    handleSubmit,
    reset,
    validate
  }
}