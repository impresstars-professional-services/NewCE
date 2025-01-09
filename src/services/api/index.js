// Export individual API services
export { authApi } from './authApi';
export { userApi } from './userApi';
export { bookingApi } from './bookingApi';
export { addressApi } from './addressApi';
export { vehicleApi } from './vehicleApi';

// Legacy apiService export
import { authApi } from './authApi';
import { userApi } from './userApi';
import { bookingApi } from './bookingApi';

export const apiService = {
  // Auth methods
  login: authApi.signIn,
  logout: authApi.signOut,

  // User methods
  getUserData: userApi.getUserData,
  updateUserProfile: userApi.updateProfile,

  // Booking methods
  getBookings: bookingApi.getBookings,
  createBooking: bookingApi.createBooking,
  updateBooking: bookingApi.updateBooking
};