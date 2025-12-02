import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import consultasRoutes from './routes/consultas.routes.js'

// Carrega variáveis de ambiente
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// CORS Configuration - Permitir qualquer origem
const corsOptions = {
  origin: '*', // Permite requisições de qualquer origem
  credentials: false, // Desabilitado quando origin é '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware (desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
  })
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/consultas', consultasRoutes)

// Rota 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Rota não encontrada',
    path: req.path 
  })
})

// Error handler global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  })
  
  res.status(err.status || 500).json({ 
    success: false,
    error: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { 
      message: err.message,
      stack: err.stack 
    })
  })
})

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📡 Ambiente: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

