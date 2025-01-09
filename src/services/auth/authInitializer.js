import { supabase } from '../database/supabaseClient';
import store from '../../store';

export const initializeAuth = async () => {
  try {
    // Get initial session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    // Set up auth state change listener
    supabase.auth.onAuthStateChange(async (event, session) => {
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
    console.error('Auth initialization failed:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to initialize authentication'
    };
  }
};