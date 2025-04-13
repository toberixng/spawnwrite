// lib/supabase/client.ts
'use client';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = () =>
  createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );