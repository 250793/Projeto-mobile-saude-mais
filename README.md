# Projeto Mobile Saúde Mais

Sistema completo de gestão de saúde com frontend e backend separados.

## 📝 Objetivo do Projeto

O **Projeto Mobile Saúde Mais** é um sistema completo de gestão de saúde desenvolvido para **Unidades Básicas de Saúde (UBS)**.

**Problema Solucionado:** O sistema visa otimizar o tempo de atendimento e centralizar o acesso a dados de pacientes em comunidades com recursos limitados. Além disso, elimina a necessidade de o paciente sair de casa para marcar consultas.O projeto contribui diretamente com o **ODS 11 (Cidades e Comunidades Sustentáveis)** ao promover o acesso a informações essenciais para a saúde pública local.

## ✨ Funcionalidades Implementadas

O sistema implementa as seguintes funcionalidades:

* **Autenticação:** Login e Cadastro de usuários. (Status: Completo)
* **Gestão de Pacientes:** CRUD (Criação, Leitura, Atualização, Deleção) de fichas de pacientes. (Status: Incompleto)
* **Registro de Consultas:** Criação de novos prontuários e histórico médico. (Status: Incompleto)
* **Busca:** Filtro avançado de pacientes por nome. (Status: Completo)
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

## ⚙️ Arquitetura do Sistema

O sistema segue uma arquitetura multicamadas com Frontend e Backend desacoplados, comunicando-se via APIs.

* **Frontend (Cliente):** Desenvolvido em React/TypeScript, responsável pela interface e experiência do usuário.
* **Backend (API):** Desenvolvido em Node.js/Express, atuando como o servidor de aplicação e lógica de negócio.

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

🧑‍🤝‍🧑 Validação com Público-Alvo
A validação foi realizada conforme exigido na atividade.
Público-Alvo Específico: Adriana Lima Goes do NAC, do Posto Oliveira Pombo.
Localização: Bairro Panamericano.
Contexto: Necessidade de digitalizar o cadastro de medicamentos.
Processo: Realizamos uma apresentação das telas e funcionalidades principais via Presencial.
Principais Feedbacks: O principal feedback recebido foi relacionado ao formulário de cadastro de paciente.
Os detalhes completos, evidências fotográficas e o relatório estão na pasta validation/

👥 Integrantes da Equipe

Nome Fabricio da Silva Santos - 2319166 – Função: Arquitetura do software Nome Ana Rebeca Pereira dos Santos - 2326244 – Função: Front-end Nome Maria Tainá Leitão de Castro - 2323206 – Função: Front-end Nome José Eliezer de Almeida Alves - 2326192– Função: Back-end Nome Erisvan da Silva Ximenes - 2317584 – Função: Back-end


