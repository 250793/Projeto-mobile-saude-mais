1. Visão Geral

A API será desenvolvida em Node.js + Express, seguindo o padrão RESTful e retornando dados em JSON.
Toda comunicação será feita via HTTPS, com autenticação baseada em JWT (Bearer Token).

2.  Autenticação e Autorização  
    Método - Header:
    Authorization: Bearer <token>
    Perfis de acesso: - Paciente: pode acessar apenas suas próprias consultas, prontuários, receitas e notificações. - Profissional de Saúde: pode registrar prontuários e receitas dos pacientes que atende. - Gestor: pode aprovar campanhas, visualizar relatórios e gerenciar usuários.

3.  Endpoints Principais
    🔑 Autenticação
    POST /auth/refresh - Descrição: Autentica usuário e retorna token JWT. - Body:

            {
            "email": "usuario@exemplo.com",
            "senha": "123456"
            }

        - Resposta 200:

            {
            "token": "jwt_gerado_aqui",
            "refreshToken": "refresh_token_aqui",
            "role": "paciente"
            }

👤 Usuários
POST /usuarios

- Descrição: Criação de novo usuário (paciente, profissional ou gestor).
- Body:
  {
  "nome": "João da Silva",
  "email": "joao@exemplo.com",
  "senha": "123456",
  "cpf": "12345678901",
  "tipo": "paciente"
  }


    GET /usuarios/:id
    - Descrição: Retorna dados de um usuário (restrito ao próprio usuário ou a gestores).
    - Resposta 200:
            {
        "id": 1,
        "nome": "João da Silva",
        "email": "joao@exemplo.com",
        "tipo": "paciente"
        }

📅 Consultas
POST /consultas

- Descrição: Agendamento de consulta.
- Body:
  {
  "paciente_id": 1,
  "posto_id": 2,
  "data": "2025-10-01T09:00:00"
  }
- Resposta 201:
  {
  "id": 5,
  "status": "agendada",
  "mensagem": "Consulta marcada com sucesso"
  }

  DELETE /consultas/:id

  - Descrição: Cancela uma consulta (paciente só pode cancelar até 24h antes).
  - Resposta 200:
    {
    "mensagem": "Consulta cancelada com sucesso"
    }

📝 Prontuários
POST /prontuarios

- Descrição: Criar ou atualizar prontuário (somente médicos).
- Body:
  {
  "consulta_id": 5,
  "paciente_id": 1,
  "descricao": "Paciente apresentou sintomas leves de gripe..."
  }
- Resposta 201:  
   {
  "id": 12,
  "mensagem": "Prontuário registrado com sucesso"
  }

💊 Receitas
POST /receitas - Descrição: Criar receita digital (somente médicos). - Body:
{
"consulta_id": 5,
"medico_id": 3,
"medicamentos": "Paracetamol 500mg, 1 comprimido a cada 8h por 5 dias"
} - Resposta 201:
{
"id": 20,
"mensagem": "Receita registrada com sucesso"
}

📢 Campanhas
POST /campanhas

- Descrição: Criar nova campanha (status = pendente, apenas gestores).
- Body:
  {
  "titulo": "Campanha de Vacinação contra Gripe",
  "descricao": "Vacinação gratuita para idosos",
  "inicio": "2025-09-20",
  "fim": "2025-10-15"
  }
- Resposta 201:
  {
  "id": 3,
  "status": "pendente",
  "mensagem": "Campanha cadastrada, aguardando aprovação"
  }
  PUT /campanhas/:id/aprovar - Descrição: Aprova campanha (apenas gestores). - Resposta 200:
  {
  "id": 3,
  "status": "ativa",
  "mensagem": "Campanha aprovada com sucesso"
  }

🔔 Notificações
GET /notificacoes/:user_id

- Descrição: Enviar notificação (apenas gestores e sistema).
- Resposta 200:
  [
  {
  "id": 1,
  "mensagem": "Sua consulta foi confirmada para 01/10/2025 às 09h",
  "tipo": "consulta",
  "enviado_em": "2025-09-15T10:30:00"
  }
  ]

| Método | Endpoint | Descrição | Autorização |

|POST|`/auth/login`|Login e geração de token|Público|
|POST| `/usuarios` |Criar novo usuário | Gestor |
|GET|`/usuarios/:id`|Consultardados do usuário|Self/Gestor|
|POST|`/consultas`|Criar agendamento | Paciente |
|DELETE|`/consultas/:id`|Cancelar consulta|Paciente |
|POST|`/prontuarios`|Criar/atualizar prontuário|Médico|
|POST|`/receitas`|Criar receita digital| Médico|
|POST|`/campanhas`| Criar campanha| Gestor |
|PUT|`/campanhas/:id/aprovar`|Aprovar campanha|Gestor|
|GET|`/campanhas`|Listar campanhas ativas| Público (logado) |
|GET|`/notificacoes/:user_id`|Listarnotificaçõesdeumpaciente| Self |
