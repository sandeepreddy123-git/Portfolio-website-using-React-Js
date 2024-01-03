import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://crfqttifajrybpngtpfs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZnF0dGlmYWpyeWJwbmd0cGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxNDAzNTAsImV4cCI6MjAwMTcxNjM1MH0.Ebmx_u7CO9n6vksXBqW72T9IzCLixZAO1S0P2ZtfVwI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
