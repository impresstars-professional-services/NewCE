import { ref, computed } from 'vue'

export function useAsync(asyncFn) {
  const isLoading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const hasError = computed(() => error.value !== null)
  const hasData = computed(() => data.value !== null)

  const execute = async (...args) => {
    isLoading.value = true
    error.value = null
    
    try {
      data.value = await asyncFn(...args)
      return data.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    isLoading.value = false
    error.value = null
    data.value = null
  }

  return {
    isLoading,
    error,
    data,
    hasError,
    hasData,
    execute,
    reset
  }
}