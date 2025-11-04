import { Response } from 'express'

/**
 * Resposta padronizada de sucesso
 */
export function successResponse<T>(res: Response, data: T, statusCode: number = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  })
}

/**
 * Resposta padronizada de erro
 */
export function errorResponse(
  res: Response,
  message: string,
  statusCode: number = 400,
  details?: any
) {
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details }),
  })
}

/**
 * Resposta padronizada de erro de validação
 */
export function validationErrorResponse(res: Response, errors: any[]) {
  return res.status(400).json({
    success: false,
    error: 'Erro de validação',
    details: errors,
  })
}

