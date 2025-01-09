export default {
  isAuthenticated: state => !!state.session && !!state.user,
  currentUser: state => state.user,
  error: state => state.error,
  isLoading: state => state.loading,
  isInitialized: state => state.initialized,
  session: state => state.session
}