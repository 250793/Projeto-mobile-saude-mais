/**
 * Remove formatação de CPF (remove pontos, traços e espaços)
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, '')
}

/**
 * Valida formato de CPF (11 dígitos numéricos)
 */
export function isValidCPFFormat(cpf: string): boolean {
  const clean = cleanCPF(cpf)
  return /^\d{11}$/.test(clean)
}

/**
 * Valida CPF usando algoritmo de validação
 */
export function validateCPF(cpf: string): boolean {
  const clean = cleanCPF(cpf)
  
  if (clean.length !== 11) return false
  if (/^(\d)\1{10}$/.test(clean)) return false // Todos os dígitos iguais
  
  let sum = 0
  let remainder
  
  // Valida primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(clean.substring(9, 10))) return false
  
  sum = 0
  // Valida segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(clean.substring(10, 11))) return false
  
  return true
}

/**
 * Sanitiza string removendo espaços e convertendo para minúsculas
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

/**
 * Sanitiza string removendo espaços extras
 */
export function sanitizeString(str: string): string {
  return str.trim().replace(/\s+/g, ' ')
}

