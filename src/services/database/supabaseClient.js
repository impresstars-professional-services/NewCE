import { createClient } from '@supabase/supabase-js';
import { AUTH_CONFIG } from '../../config/auth';

// Create and export Supabase client
export const supabase = createClient(
  AUTH_CONFIG.url,
  AUTH_CONFIG.anonKey,
  {
    auth: AUTH_CONFIG.options
  }
);