import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
  console.error('Invalid or missing VITE_SUPABASE_URL:', supabaseUrl);
  throw new Error('Invalid or missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY');
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

function isValidUrl(urlString: string) {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Initialize auth state handling
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
    // Clear any stored tokens
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('sb-' + supabaseUrl.split('//')[1] + '-auth-token');
  }
});

// Handle initial session
supabase.auth.getSession().catch((error) => {
  console.error("Error getting session:", error);
  // Clear potentially corrupted session data
  supabase.auth.signOut().then(() => {
    localStorage.clear(); // Clear all Supabase-related data
    window.location.href = '/login';
  });
});