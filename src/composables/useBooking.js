import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNotification } from './useNotification'
import { validateBooking } from '../utils/validators/bookingValidator'
import { bookingService } from '../services/domain/bookingService'

export function useBooking() {
  const store = useStore()
  const notification = useNotification()
  const isLoading = ref(false)
  const error = ref(null)

  const upcomingBookings = computed(() => store.getters['bookings/upcomingBookings'])
  const pastBookings = computed(() => store.getters['bookings/pastBookings'])

  const createBooking = async (bookingData) => {
    if (!validateBooking(bookingData)) {
      notification.showError('Invalid booking data')
      return { success: false, error: 'Invalid booking data' }
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await bookingService.createBooking(store.getters['auth/userId'], bookingData)
      if (result.success) {
        notification.showSuccess('Booking created successfully')
        await store.dispatch('bookings/fetchBookings')
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

  const cancelBooking = async (bookingId) => {
    isLoading.value = true
    error.value = null

    try {
      const result = await bookingService.cancelBooking(store.getters['auth/userId'], bookingId)
      if (result.success) {
        notification.showSuccess('Booking cancelled successfully')
        await store.dispatch('bookings/fetchBookings')
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
    upcomingBookings,
    pastBookings,
    createBooking,
    cancelBooking
  }
}