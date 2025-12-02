/**
 * Configuração da API do backend
 */
const getApiUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001'
  }
  return 'http://localhost:3001'
}

const API_URL = getApiUrl()

export interface ApiResponse<T> {
  data?: T
  error?: string
  details?: any
}

/**
 * Cliente HTTP para fazer requisições à API
 * Implementa interceptors para gerenciar tokens automaticamente
 */
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  /**
   * Obtém o token do localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * Remove o token do localStorage
   */
  private removeToken(): void {
    localStorage.removeItem('auth_token')
  }

  /**
   * Faz uma requisição GET
   * @param endpoint - Endpoint da API
   * @param useAuth - Se true, adiciona token automaticamente (padrão: true)
   */
  async get<T>(endpoint: string, useAuth: boolean = true): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (useAuth) {
        const token = this.getToken()
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers,
      })

      const data = await response.json()

      // Se receber 401, token pode estar inválido
      if (response.status === 401 && useAuth) {
        this.removeToken()
      }

      if (!response.ok) {
        return {
          error: data.error || 'Erro na requisição',
          details: data.details,
        }
      }

      // Se a resposta tem success: true, extrai data
      return { data: data.success ? data.data : data }
    } catch (error: any) {
      console.error('Erro na requisição GET:', error)
      return {
        error: error.message || 'Erro ao fazer requisição',
      }
    }
  }

  /**
   * Faz uma requisição POST
   * @param endpoint - Endpoint da API
   * @param body - Corpo da requisição
   * @param useAuth - Se true, adiciona token automaticamente (padrão: true)
   */
  async post<T>(endpoint: string, body: any, useAuth: boolean = true): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (useAuth) {
        const token = this.getToken()
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
      }

      console.log("BODY enviado:", body);


      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })

      const data = await response.json()

      // Se receber 401, token pode estar inválido
      if (response.status === 401 && useAuth) {
        this.removeToken()
      }

      if (!response.ok) {
        return {
          error: data.error || 'Erro na requisição',
          details: data.details,
        }
      }

      // Se a resposta tem success: true, extrai data
      return { data: data.success ? data.data : data }
    } catch (error: any) {
      console.error('Erro na requisição POST:', error)
      return {
        error: error.message || 'Erro ao fazer requisição',
      }
    }
  }

  /**
   * Faz uma requisição PUT
   */
  async put<T>(endpoint: string, body: any, useAuth: boolean = true): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (useAuth) {
        const token = this.getToken()
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.status === 401 && useAuth) {
        this.removeToken()
      }

      if (!response.ok) {
        return {
          error: data.error || 'Erro na requisição',
          details: data.details,
        }
      }

      return { data: data.success ? data.data : data }
    } catch (error: any) {
      console.error('Erro na requisição PUT:', error)
      return {
        error: error.message || 'Erro ao fazer requisição',
      }
    }
  }

  /**
   * Faz uma requisição DELETE
   */
  async delete<T>(endpoint: string, useAuth: boolean = true): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (useAuth) {
        const token = this.getToken()
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers,
      })

      const data = await response.json()

      if (response.status === 401 && useAuth) {
        this.removeToken()
      }

      if (!response.ok) {
        return {
          error: data.error || 'Erro na requisição',
          details: data.details,
        }
      }

      return { data: data.success ? data.data : data }
    } catch (error: any) {
      console.error('Erro na requisição DELETE:', error)
      return {
        error: error.message || 'Erro ao fazer requisição',
      }
    }
  }
}

export const apiClient = new ApiClient(API_URL)

