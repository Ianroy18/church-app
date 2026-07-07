import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id'));

const missingConfigError = new Error(
  'Supabase is not configured. Please add a valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your local .env file.'
);

function createMissingSupabaseProxy() {
  const auth = {
    getSession: async () => ({ data: { session: null }, error: missingConfigError }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: null, error: missingConfigError }),
    signUp: async () => ({ data: null, error: missingConfigError }),
    signOut: async () => ({ data: null, error: missingConfigError }),
  };

  const from = () => ({
    select: async () => ({ data: null, error: missingConfigError }),
    insert: async () => ({ data: null, error: missingConfigError }),
    update: async () => ({ data: null, error: missingConfigError }),
    delete: async () => ({ data: null, error: missingConfigError }),
    order: () => ({ data: null, error: missingConfigError }),
    eq: () => ({ data: null, error: missingConfigError }),
  });

  const storage = {
    from: () => ({
      upload: async () => ({ data: null, error: missingConfigError }),
      getPublicUrl: () => ({ data: null, error: missingConfigError }),
    }),
  };

  return { auth, from, storage };
}

if (!hasSupabaseConfig) {
  console.error(missingConfigError);
}

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMissingSupabaseProxy();
