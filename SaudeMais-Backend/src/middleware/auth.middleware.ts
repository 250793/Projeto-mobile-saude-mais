import { Request, Response, NextFunction } from 'express'
import { getCurrentUser } from '../services/auth.service'

// Estende o tipo Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email?: string
        userType: string
        name?: string
      }
    }
  }
}

/**
 * Middleware para verificar autenticação
 */
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' })
    }

    const { user, error } = await getCurrentUser(token)

    if (error || !user) {
      return res.status(401).json({ error: error || 'Token inválido' })
    }

    // Adiciona o usuário ao request
    req.user = user
    next()
  } catch (error: any) {
    console.error('Erro na autenticação:', error)
    return res.status(401).json({ error: 'Erro ao verificar autenticação' })
  }
}

/**
 * Middleware para verificar tipo de usuário
 */
export function requireUserType(allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    if (!allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({ 
        error: `Acesso negado. Tipos permitidos: ${allowedTypes.join(', ')}` 
      })
    }

    next()
  }
}

