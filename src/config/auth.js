import { getEnvVar } from './env';

export const AUTH_CONFIG = {
  url: getEnvVar('SUPABASE_URL'),
  anonKey: getEnvVar('SUPABASE_ANON_KEY'),
  options: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};