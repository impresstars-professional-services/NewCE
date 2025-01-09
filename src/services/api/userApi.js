import { supabase } from '../database/supabaseClient';

export const userApi = {
  async getUserData(userId) {
    try {
      // First check if user exists in auth
      const { data: authUser, error: authError } = await supabase.auth.getUser(userId);
      if (authError) throw authError;

      // Then get profile data
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      return { 
        success: true, 
        data: { ...profile, email: authUser.user.email }
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { success: false, error: error.message };
    }
  }
};