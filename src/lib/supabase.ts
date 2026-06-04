import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Get config from localStorage or env variables
export function getSupabaseConfig(): SupabaseConfig | null {
  const localUrl = localStorage.getItem("supabase_url");
  const localKey = localStorage.getItem("supabase_anon_key");

  if (localUrl && localKey) {
    return { url: localUrl, anonKey: localKey };
  }

  // Fallback to build-time environment variables
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  return null;
}

// Initialize and retrieve the Supabase client
export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const config = getSupabaseConfig();
  if (!config) return null;

  try {
    supabaseInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: false // stateless client for public actions
      }
    });
    return supabaseInstance;
  } catch (error) {
    console.error("Failed to initialize Supabase:", error);
    return null;
  }
}

// Reset instance when credentials change
export function resetSupabaseClient() {
  supabaseInstance = null;
}

// Save credentials
export function saveSupabaseConfig(url: string, anonKey: string) {
  if (url.trim() && anonKey.trim()) {
    localStorage.setItem("supabase_url", url.trim());
    localStorage.setItem("supabase_anon_key", anonKey.trim());
  } else {
    localStorage.removeItem("supabase_url");
    localStorage.removeItem("supabase_anon_key");
  }
  resetSupabaseClient();
}
