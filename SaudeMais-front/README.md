# Saude Mais - Frontend

Frontend do sistema Saude Mais, construído com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Backend API rodando (veja README do backend)

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_API_URL=http://localhost:3001
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

A aplicação será iniciada em `http://localhost:5173`

### Produção
```bash
npm run build
npm run preview
```

## 📚 Estrutura do Projeto

```
src/
├── components/      # Componentes React
│   ├── ui/         # Componentes de UI reutilizáveis
│   └── ...         # Componentes específicos da aplicação
├── lib/            # Bibliotecas e utilitários
│   ├── api.ts      # Cliente HTTP para API
│   └── auth.ts     # Funções de autenticação
├── App.tsx         # Componente principal
└── main.tsx        # Entry point
```

## 🔐 Autenticação

O frontend se comunica com o backend através da API REST. O token de autenticação é armazenado no `localStorage` e enviado em todas as requisições protegidas.

### Fluxo de Autenticação

1. Usuário faz login/cadastro
2. Backend retorna token JWT
3. Token é armazenado no `localStorage`
4. Token é enviado em todas as requisições via header `Authorization: Bearer {token}`

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `VITE_API_URL` | URL do backend API | Não (padrão: http://localhost:3001) |

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Preview da build de produção

## 🔗 Integração com Backend

O frontend se comunica com o backend através de:

- **POST /api/auth/login** - Login
- **POST /api/auth/signup** - Cadastro
- **POST /api/auth/logout** - Logout
- **GET /api/auth/me** - Obter usuário atual

## 📄 Licença

ISC
