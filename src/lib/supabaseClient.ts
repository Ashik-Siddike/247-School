import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZWRhdnlocmJoYWJxc3dneGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNDkwMjQsImV4cCI6MjA2NTgyNTAyNH0.g7qETNhG9wn_P3ulvDfxkVQjbHhqv4xST_IaK3tsSgg