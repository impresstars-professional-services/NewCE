import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNotification } from './useNotification'
import { validateAddress } from '../utils/validators/addressValidator'
import { addressService } from '../services/domain/addressService'

export function useAddress() {
  const store = useStore()
  const notification = useNotification()
  const isLoading = ref(false)
  const error = ref(null)

  const addresses = computed(() => store.getters['addresses/allAddresses'])

  const saveAddress = async (addressData) => {
    if (!validateAddress(addressData)) {
      notification.showError('Invalid address data')
      return { success: false, error: 'Invalid address data' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await addressService.saveAddress(store.getters['auth/userId'], addressData)
      if (result.success) {
        notification.showSuccess(addressData.id ? 'Address updated successfully' : 'Address added successfully')
        await store.dispatch('addresses/fetchAddresses')
      }
      return result
    } catch (err) {
      error.value = err.message
      notification.showError(err.message)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const deleteAddress = async (addressId) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await addressService.deleteAddress(store.getters['auth/userId'], addressId)
      if (result.success) {
        notification.showSuccess('Address deleted successfully')
        await store.dispatch('addresses/fetchAddresses')
      }
      return result
    } catch (err) {
      error.value = err.message
      notification.showError(err.message)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    addresses,
    saveAddress,
    deleteAddress
  }
}