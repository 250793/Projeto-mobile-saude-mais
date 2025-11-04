import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('⚠️  Variáveis de ambiente do Supabase não configuradas')
  console.warn('Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env')
}

// Cliente com service role key (acesso total ao banco)
// Usado para operações administrativas no backend
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Cliente com anon key (acesso limitado)
// Usado para operações que precisam respeitar RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

