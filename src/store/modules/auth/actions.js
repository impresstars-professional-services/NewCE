import { authService } from '../../../services/auth/authService';
import { supabase } from '../../../services/database/supabaseClient';

export default {
  async initialize({ commit }) {
    try {
      const session = await authService.getSession();
      if (!session) {
        commit('SET_INITIALIZED', true);
        return { success: true };
      }

      // Get user profile data
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      commit('SET_SESSION', session);
      commit('SET_USER', { ...session.user, ...profile });
      commit('SET_INITIALIZED', true);
      return { success: true };
    } catch (error) {
      console.error('Auth initialization failed:', error);
      commit('SET_ERROR', error.message);
      commit('SET_INITIALIZED', true);
      return { success: false, error: error.message };
    }
  },

  async login({ commit }, { email, password }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const result = await authService.signIn(email, password);
      if (!result.success) throw new Error(result.error);
      
      commit('SET_SESSION', result.data.session);
      commit('SET_USER', result.data.user);
      return { success: true };
    } catch (error) {
      commit('SET_ERROR', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async signUp({ commit }, { email, password, firstName, lastName, phone }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) throw authError;

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
          account_type: 'Basic'
        }]);

      if (profileError) throw profileError;

      return { success: true };
    } catch (error) {
      commit('SET_ERROR', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async logout({ commit }) {
    commit('SET_LOADING', true);
    try {
      const result = await authService.signOut();
      if (!result.success) throw new Error(result.error);
      
      commit('RESET_STATE');
      return { success: true };
    } catch (error) {
      commit('SET_ERROR', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  }
};