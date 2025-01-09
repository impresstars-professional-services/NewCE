import { authService } from './authService';
import store from '../../store';

export const sessionManager = {
  async initialize() {
    try {
      // Get initial session
      const session = await authService.getSession();
      
      // Set up auth state change listener
      authService.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          await store.dispatch('auth/initialize');
        } else if (event === 'SIGNED_OUT') {
          store.commit('auth/RESET_STATE');
        }
      });

      // Initialize auth state if session exists
      if (session) {
        await store.dispatch('auth/initialize');
      }

      return { success: true };
    } catch (error) {
      console.error('Session initialization failed:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to initialize session'
      };
    }
  }
};