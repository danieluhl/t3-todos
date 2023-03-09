import { createClient } from "@supabase/supabase-js";
import { env } from "../env.mjs";
import type { Database } from "../../types/supabase";

export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);
