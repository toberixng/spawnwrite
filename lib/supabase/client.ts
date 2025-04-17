// Path: /lib/supabase/client.ts

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required in the environment variables')
}

// Create the client
const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Export the supabase instance for direct use
export { supabase }

// Export the function to create a new client if needed
export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey)
