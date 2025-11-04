import { apiClient } from './api'

export interface AuthUser {
  id: string
  email?: string
  userType: string
  name?: string
}

export interface LoginCredentials {
  identifier: string // CPF ou email
  password: string
  userType: string
}

export interface SignUpData {
  email: string
  password: string
  cpf: string
  name: string
  userType: string
}

/**
 * Armazena o token no localStorage
 */
function setToken(token: string) {
  localStorage.setItem('auth_token', token)
}

/**
 * Obtém o token do localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem('auth_token')
}

/**
 * Remove o token do localStorage
 */
function removeToken() {
  localStorage.removeItem('auth_token')
}

/**
 * Faz login no sistema usando email ou CPF
 */
export async function login(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    const response = await apiClient.post<{ user: AuthUser; token: string }>('/api/auth/login', credentials, false)

    if (response.error) {
      return { user: null, error: response.error }
    }

    if (response.data) {
      // Armazena o token
      if (response.data.token) {
        setToken(response.data.token)
      }

      return { user: response.data.user, error: null }
    }

    return { user: null, error: 'Erro ao fazer login' }
  } catch (error: any) {
    console.error('Erro no login:', error)
    return { user: null, error: error.message || 'Erro ao fazer login' }
  }
}

/**
 * Registra um novo usuário no sistema
 */
export async function signUp(data: SignUpData): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    const response = await apiClient.post<{ user: AuthUser; token: string }>('/api/auth/signup', data, false)

    if (response.error) {
      return { user: null, error: response.error }
    }

    if (response.data) {
      // Armazena o token
      if (response.data.token) {
        setToken(response.data.token)
      }

      return { user: response.data.user, error: null }
    }

    return { user: null, error: 'Erro ao criar conta' }
  } catch (error: any) {
    console.error('Erro no cadastro:', error)
    return { user: null, error: error.message || 'Erro ao criar conta' }
  }
}

/**
 * Faz logout do usuário
 */
export async function logout(): Promise<{ error: string | null }> {
  try {
    const token = getToken()

    if (!token) {
      removeToken()
      return { error: null }
    }

    const response = await apiClient.post('/api/auth/logout', {})

    // Remove o token independente do resultado
    removeToken()

    if (response.error) {
      return { error: response.error }
    }

    return { error: null }
  } catch (error: any) {
    console.error('Erro no logout:', error)
    // Remove o token mesmo em caso de erro
    removeToken()
    return { error: error.message || 'Erro ao fazer logout' }
  }
}

/**
 * Obtém o usuário atual da sessão
 */
export async function getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    const token = getToken()

    if (!token) {
      return { user: null, error: 'Token não encontrado' }
    }

    const response = await apiClient.get<{ user: AuthUser }>('/api/auth/me')

    if (response.error) {
      // Se o token for inválido, remove do storage
      if (response.error.includes('inválido') || response.error.includes('não autenticado')) {
        removeToken()
      }
      return { user: null, error: response.error }
    }

    if (response.data) {
      return { user: response.data.user, error: null }
    }

    return { user: null, error: 'Erro ao obter usuário' }
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error)
    removeToken()
    return { user: null, error: error.message || 'Erro ao obter usuário' }
  }
}

/**
 * Escuta mudanças no estado de autenticação
 * Nota: Em uma implementação real, você pode usar WebSockets ou polling
 * Por enquanto, retorna uma função vazia que pode ser usada para limpar
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  // Verifica periodicamente se o usuário ainda está autenticado
  const interval = setInterval(async () => {
    const { user } = await getCurrentUser()
    callback(user)
  }, 5000) // Verifica a cada 5 segundos

  // Retorna uma função para cancelar o intervalo
  return {
    data: {
      subscription: {
        unsubscribe: () => clearInterval(interval)
      }
    }
  }
}
