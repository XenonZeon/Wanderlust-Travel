import { createClient } from "@supabase/supabase-js";

// server-only — never import in client components
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key);
}

export const supabase = getSupabaseClient();
