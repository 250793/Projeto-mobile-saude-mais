# Projeto Mobile Saúde Mais

Sistema completo de gestão de saúde com frontend e backend separados.

## 📁 Estrutura do Projeto

```
Projeto-mobile-saude-mais/
├── SaudeMais-front/     # Frontend React + TypeScript + Vite
└── SaudeMais-Backend/   # Backend Node.js + Express + TypeScript
```

## 🚀 Início Rápido

### 1. Backend

1. Navegue até a pasta do backend:
```bash
cd SaudeMais-Backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie o arquivo .env
# Edite com suas credenciais do Supabase:
```

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
SUPABASE_ANON_KEY=sua_chave_anon
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Execute o script SQL no Supabase:
   - Acesse o SQL Editor no Supabase
   - Execute o conteúdo de `SaudeMais-front/supabase-setup.sql`

5. Execute o backend:
```bash
npm run dev
```

O backend estará rodando em `http://localhost:3001`

✅ **Health Check:** `http://localhost:3001/health`

### 2. Frontend

1. Navegue até a pasta do frontend:
```bash
cd SaudeMais-front
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
# Crie um arquivo .env
echo "VITE_API_URL=http://localhost:3001" > .env
```

4. Execute o frontend:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## ✅ Status Atual

- ✅ Backend: Rodando na porta 3001
- ✅ Frontend: Configurado para porta 5173
- ✅ Integração: Funcionando
- ⚠️ Supabase: Configurar credenciais no `.env`

## 📚 Documentação

- [Backend README](SaudeMais-Backend/README.md)
- [Frontend README](SaudeMais-front/README.md)

## 🔧 Tecnologias

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI

### Backend
- Node.js
- Express
- TypeScript
- Supabase
- Zod (validação)

## 📝 Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Projeto Supabase configurado

## 🔐 Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o script SQL fornecido em `SaudeMais-front/supabase-setup.sql`
3. Configure as credenciais no backend (arquivo `.env`)

## 📄 Licença

ISC

