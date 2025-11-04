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

export interface AuthResponse {
  user: AuthUser | null
  error: string | null
  token?: string
}

