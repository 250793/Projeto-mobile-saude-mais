import { Router } from 'express'
import { login, signUp, logout } from '../services/auth.service'
import { authenticateToken } from '../middleware/auth.middleware'
import { validate } from '../middleware/validation.middleware'
import { successResponse, errorResponse } from '../utils/response.util'
import { validateCPF } from '../utils/validation.util'
import { z } from 'zod'

const router = Router()

// Schemas de validação
const loginSchema = z.object({
  identifier: z.string().min(1, 'Identificador é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  userType: z.enum(['paciente', 'medico', 'gestor', 'recepcionista', 'estoque', 'farmacia'], {
    errorMap: () => ({ message: 'Tipo de usuário inválido' })
  })
})

const signUpSchema = z.object({
  email: z.string().email('Email inválido').transform(val => val.toLowerCase().trim()),
  password: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(100, 'Senha muito longa'),
  cpf: z.string().refine(
    (val) => validateCPF(val),
    { message: 'CPF inválido' }
  ),
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .max(200, 'Nome muito longo')
    .transform(val => val.trim().replace(/\s+/g, ' ')),
  userType: z.enum(['paciente', 'medico', 'gestor', 'recepcionista', 'estoque', 'farmacia'], {
    errorMap: () => ({ message: 'Tipo de usuário inválido' })
  })
})

/**
 * POST /api/auth/login
 * Faz login no sistema
 */
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const result = await login(req.body)

    if (result.error) {
      return errorResponse(res, result.error, 401)
    }

    if (!result.user || !result.token) {
      return errorResponse(res, 'Erro ao fazer login', 500)
    }

    return successResponse(res, {
      user: result.user,
      token: result.token
    })
  } catch (error: any) {
    console.error('Erro no login:', error)
    return errorResponse(res, 'Erro interno do servidor', 500)
  }
})

/**
 * POST /api/auth/signup
 * Registra um novo usuário
 */
router.post('/signup', validate(signUpSchema), async (req, res) => {
  try {
    const result = await signUp(req.body)

    if (result.error) {
      return errorResponse(res, result.error, 400)
    }

    if (!result.user || !result.token) {
      return errorResponse(res, 'Erro ao criar conta', 500)
    }

    return successResponse(res, {
      user: result.user,
      token: result.token
    }, 201)
  } catch (error: any) {
    console.error('Erro no cadastro:', error)
    return errorResponse(res, 'Erro interno do servidor', 500)
  }
})

/**
 * POST /api/auth/logout
 * Faz logout do usuário
 */
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return errorResponse(res, 'Token não fornecido', 401)
    }

    const result = await logout(token)

    if (result.error) {
      return errorResponse(res, result.error, 400)
    }

    return successResponse(res, { message: 'Logout realizado com sucesso' })
  } catch (error: any) {
    console.error('Erro no logout:', error)
    return errorResponse(res, 'Erro interno do servidor', 500)
  }
})

/**
 * GET /api/auth/me
 * Obtém o usuário atual
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // O usuário já está disponível em req.user pelo middleware
    if (!req.user) {
      return errorResponse(res, 'Usuário não encontrado', 404)
    }

    return successResponse(res, { user: req.user })
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error)
    return errorResponse(res, 'Erro interno do servidor', 500)
  }
})

export default router

