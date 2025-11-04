import { supabaseAdmin } from '../config/supabase'
import type { LoginCredentials, SignUpData, AuthUser, AuthResponse } from '../types/auth'
import { cleanCPF, sanitizeEmail, sanitizeString } from '../utils/validation.util'

/**
 * Faz login no sistema usando email ou CPF
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Verifica se é email ou CPF
    const isEmail = credentials.identifier.includes('@')
    
    let email = ''
    
    if (isEmail) {
      email = sanitizeEmail(credentials.identifier)
    } else {
      // Se for CPF, busca o usuário pelo CPF na tabela de perfis
      const cleanCPFValue = cleanCPF(credentials.identifier)
      
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('email')
        .eq('cpf', cleanCPFValue)
        .single()
      
      if (profileError || !profile) {
        return { user: null, error: 'CPF não encontrado' }
      }
      
      email = profile.email
    }

    // Faz login com email e senha usando admin client
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password: credentials.password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    if (!data.user) {
      return { user: null, error: 'Erro ao fazer login' }
    }

    // Busca o perfil do usuário para obter o tipo de usuário
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('user_type, name')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      console.error('Erro ao buscar perfil:', profileError)
    }

    // Verifica se o tipo de usuário corresponde
    if (profile && profile.user_type !== credentials.userType) {
      await supabaseAdmin.auth.signOut()
      return { user: null, error: 'Tipo de usuário incorreto' }
    }

    const authUser: AuthUser = {
      id: data.user.id,
      email: data.user.email,
      userType: profile?.user_type || credentials.userType,
      name: profile?.name || data.user.email?.split('@')[0] || '',
    }

    return { 
      user: authUser, 
      error: null,
      token: data.session?.access_token 
    }
  } catch (error: any) {
    console.error('Erro no login:', error)
    return { user: null, error: error.message || 'Erro ao fazer login' }
  }
}

/**
 * Registra um novo usuário no sistema
 */
export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    // Sanitiza os dados
    const cleanCPFValue = cleanCPF(data.cpf)
    const sanitizedEmail = sanitizeEmail(data.email)
    const sanitizedName = sanitizeString(data.name)

    // Cria o usuário no Supabase Auth usando admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email: sanitizedEmail,
      password: data.password,
      options: {
        data: {
          name: sanitizedName,
          cpf: cleanCPFValue,
          user_type: data.userType,
        },
      },
    })

    if (authError) {
      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      return { user: null, error: 'Erro ao criar usuário' }
    }

    // Cria o perfil do usuário na tabela profiles usando admin client
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: sanitizedEmail,
        name: sanitizedName,
        cpf: cleanCPFValue,
        user_type: data.userType,
      })

    if (profileError) {
      console.error('Erro ao criar perfil:', profileError)
      // Tenta fazer logout caso o perfil não tenha sido criado
      await supabaseAdmin.auth.signOut()
      return { user: null, error: 'Erro ao criar perfil do usuário' }
    }

    const authUser: AuthUser = {
      id: authData.user.id,
      email: authData.user.email,
      userType: data.userType,
      name: sanitizedName,
    }

    return { 
      user: authUser, 
      error: null,
      token: authData.session?.access_token 
    }
  } catch (error: any) {
    console.error('Erro no cadastro:', error)
    return { user: null, error: error.message || 'Erro ao criar conta' }
  }
}

/**
 * Faz logout do usuário
 */
export async function logout(token: string): Promise<{ error: string | null }> {
  try {
    // Cria um cliente temporário com o token do usuário
    const { error } = await supabaseAdmin.auth.signOut()
    if (error) {
      return { error: error.message }
    }
    return { error: null }
  } catch (error: any) {
    console.error('Erro no logout:', error)
    return { error: error.message || 'Erro ao fazer logout' }
  }
}

/**
 * Obtém o usuário atual usando o token
 */
export async function getCurrentUser(token: string): Promise<AuthResponse> {
  try {
    // Cria um cliente temporário com o token do usuário
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return { user: null, error: error?.message || 'Usuário não autenticado' }
    }

    // Busca o perfil do usuário
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('user_type, name, cpf')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Erro ao buscar perfil:', profileError)
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      userType: profile?.user_type || 'paciente',
      name: profile?.name || user.email?.split('@')[0] || '',
    }

    return { user: authUser, error: null }
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error)
    return { user: null, error: error.message || 'Erro ao obter usuário' }
  }
}

