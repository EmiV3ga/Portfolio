import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
  throw new Error('Invalid or missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseKey) {
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

export const supabase = createClient(supabaseUrl, supabaseKey);