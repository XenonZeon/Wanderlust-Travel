import { createHash } from "crypto";
import { supabase } from "./supabase";

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "default-salt";
  return createHash("sha256").update(ip + salt).digest("hex");
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  const max = parseInt(process.env.RATE_LIMIT_MAX ?? "5", 10);
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) return false; // fail open on DB error
  return (count ?? 0) >= max;
}
