export default {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_INITIALIZED(state, initialized) {
    state.initialized = initialized;
  },
  SET_SESSION(state, session) {
    state.session = session;
  },
  RESET_STATE(state) {
    state.user = null;
    state.loading = false;
    state.error = null;
    state.initialized = false;
    state.session = null;
  }
}