import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const supabaseUrl = "https://vvdwhuzxrillemzelluy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZHdodXp4cmlsbGVtemVsbHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NDg0MDgsImV4cCI6MjA0NjAyNDQwOH0.2VaIpSNRxYcmdco3zZkOkQMBvoSbm-DXobcV_1JWNnY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase