import { getEnvVar } from './env';
import { AUTH_ERRORS } from './constants';

export const supabaseConfig = {
  url: getEnvVar('SUPABASE_URL'),
  anonKey: getEnvVar('SUPABASE_ANON_KEY'),
  authConfig: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};

export const validateSupabaseConfig = () => {
  if (!supabaseConfig.url || !supabaseConfig.anonKey) {
    throw new Error(AUTH_ERRORS.MISSING_CONFIG);
  }
};