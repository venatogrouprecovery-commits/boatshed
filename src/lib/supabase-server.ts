import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseConfig } from './supabase-config';

export function hasSupabaseConfig() {
  return getSupabaseConfig().configured;
}

export function createClient() {
  const cookieStore = cookies();
  const { url, anonKey, configured } = getSupabaseConfig();

  if (!configured || !url || !anonKey) {
    throw new Error('Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server Components cannot set cookies. Server Actions can.
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // Server Components cannot remove cookies. Server Actions can.
        }
      }
    }
  });
}
