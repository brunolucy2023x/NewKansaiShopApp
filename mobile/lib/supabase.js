import { createClient } from "@supabase/supabase-js";

/* =========================================================
   ENV VARIABLES
========================================================= */

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/* =========================================================
   VALIDATION
========================================================= */

if (!supabaseUrl) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL"
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/* =========================================================
   SUPABASE CLIENT
========================================================= */

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    }
  );