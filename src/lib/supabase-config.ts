export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const configured = Boolean(
    url &&
      key &&
      url.startsWith('https://') &&
      url.includes('.supabase.co') &&
      !url.includes('your-') &&
      !key.includes('your-')
  );

  return { url, anonKey: key, configured };
}
