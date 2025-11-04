import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { validationErrorResponse } from '../utils/response.util'

/**
 * Middleware para validar dados usando Zod
 */
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse e transforma os dados
      const parsedData = schema.parse(req.body)
      // Atualiza o body com os dados transformados
      req.body = parsedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
        return validationErrorResponse(res, errors)
      }
      return res.status(400).json({ 
        success: false,
        error: 'Erro de validação' 
      })
    }
  }
}

