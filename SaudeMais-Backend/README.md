# Saude Mais - Backend API

Backend API para o sistema Saude Mais, construído com Node.js, Express e TypeScript, integrado com Supabase.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Supabase** - Backend as a Service (BaaS)
- **Zod** - Validação de schemas
- **CORS** - Configuração de CORS

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Projeto Supabase configurado

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e preencha com suas credenciais do Supabase:

```env
SUPABASE_URL=sua_url_do_projeto
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
SUPABASE_ANON_KEY=sua_chave_anon
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3001`

### Produção
```bash
npm run build
npm start
```

## 📚 Estrutura do Projeto

```
src/
├── config/          # Configurações (Supabase, etc)
├── middleware/      # Middlewares (auth, validation)
├── routes/          # Rotas da API
├── services/        # Lógica de negócio
├── types/           # Tipos TypeScript
└── server.ts        # Arquivo principal do servidor
```

## 🔐 Rotas de Autenticação

### POST /api/auth/login
Faz login no sistema com email ou CPF.

**Body:**
```json
{
  "identifier": "email@exemplo.com" ou "123.456.789-00",
  "password": "senha123",
  "userType": "paciente"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "email@exemplo.com",
    "userType": "paciente",
    "name": "Nome do Usuário"
  },
  "token": "access_token"
}
```

### POST /api/auth/signup
Registra um novo usuário no sistema.

**Body:**
```json
{
  "email": "email@exemplo.com",
  "password": "senha123",
  "cpf": "123.456.789-00",
  "name": "Nome Completo",
  "userType": "paciente"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "email@exemplo.com",
    "userType": "paciente",
    "name": "Nome Completo"
  },
  "token": "access_token"
}
```

### POST /api/auth/logout
Faz logout do usuário atual.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### GET /api/auth/me
Obtém informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "email@exemplo.com",
    "userType": "paciente",
    "name": "Nome do Usuário"
  }
}
```

## 🔒 Autenticação

As rotas protegidas requerem um token de autenticação no header:

```
Authorization: Bearer {token}
```

O token é retornado nas rotas de login e signup.

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento (watch mode)
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em modo produção
- `npm run type-check` - Verifica tipos sem compilar

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `SUPABASE_URL` | URL do projeto Supabase | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role do Supabase | Sim |
| `SUPABASE_ANON_KEY` | Chave anon do Supabase | Sim |
| `PORT` | Porta do servidor | Não (padrão: 3001) |
| `NODE_ENV` | Ambiente (development/production) | Não |
| `FRONTEND_URL` | URL do frontend para CORS | Não (padrão: http://localhost:5173) |

## 🐛 Troubleshooting

### Erro: "Variáveis de ambiente do Supabase não configuradas"
- Verifique se o arquivo `.env` existe e contém todas as variáveis necessárias
- Certifique-se de que as variáveis começam com `SUPABASE_`

### Erro de CORS
- Verifique se a variável `FRONTEND_URL` está correta no `.env`
- Certifique-se de que o frontend está rodando na URL configurada

### Erro ao conectar com Supabase
- Verifique se as credenciais do Supabase estão corretas
- Certifique-se de que o projeto Supabase está ativo
- Verifique se a tabela `profiles` foi criada no Supabase

## 📄 Licença

ISC

