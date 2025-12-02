Modelo de Dados — Saude Mais

1. Visão geral
   Este documento descreve o modelo de dados relacional projetado para suportar os requisitos do sistema: agendamento de consultas, prontuários simplificados, receitas digitais, campanhas e notificações. O foco é garantir integridade, auditabilidade e conformidade (LGPD).

2. Entidades principais

   - users — pacientes, profissionais e gestores
   - postos — unidades de saúde comunitárias
   - consultas — agendamentos e registros de atendimento
   - prontuarios — registros clínicos vinculados a consultas
   - receitas — prescrições digitais emitidas por profissionais
   - campanhas — campanhas de saúde (vacinação, etc.)
   - notificacoes — mensagens enviadas a usuários (push/email)
   - logs — auditoria de ações sensíveis

3. Diagrama ER (Mermaid)
   erDiagram
   USERS ||--o{ CONSULTAS : "tem"
   USERS ||--o{ PRONTUARIOS : "possui"
   USERS ||--o{ RECEITAS : "recebe"
   USERS ||--o{ NOTIFICACOES : "recebe"
   POSTOS ||--o{ CONSULTAS : "sediadas_em"
   CONSULTAS ||--|| PRONTUARIOS : "pode_gerar"
   CONSULTAS ||--o{ RECEITAS : "pode_gerar"
   CAMPANHAS ||--o{ NOTIFICACOES : "dispara"

   USERS {
   bigint id PK
   string nome
   string email
   string senha_hash
   string cpf
   user_role tipo
   date data_nascimento
   timestamp criado_em
   timestamp atualizado_em
   }
   POSTOS {
   bigint id PK
   string nome
   string endereco
   string bairro
   decimal lat
   decimal lon
   timestamp criado_em
   }
   CONSULTAS {
   bigint id PK
   bigint paciente_id FK
   bigint posto_id FK
   bigint profissional_id FK NULL
   timestamptz data_hora
   consulta_status status
   text motivo
   timestamp criado_em
   }
   PRONTUARIOS {
   bigint id PK
   bigint consulta_id FK
   bigint paciente_id FK
   text descricao
   timestamp criado_em
   bigint criado_por FK -- user id (profissional)
   }
   RECEITAS {
   bigint id PK
   bigint consulta_id FK
   bigint medico_id FK
   text medicamentos
   timestamp criado_em
   }
   CAMPANHAS {
   bigint id PK
   string titulo
   text descricao
   date inicio
   date fim
   campanha_status status
   timestamp criado_em
   }
   NOTIFICACOES {
   bigint id PK
   bigint user_id FK
   string mensagem
   notificacao_tipo tipo
   timestamptz enviado_em
   boolean lida
   }
   LOGS {
   bigint id PK
   bigint user_id FK NULL
   string acao
   text detalhe
   timestamptz criado_em
   }

4. Dicionário de dados (campos principais)
   Tabela: users
   | Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador único |
| nome | `varchar(200)` | Sim | Nome completo |
| email | `varchar(255)` (único) | Sim | Email para login |
| senha_hash | `varchar(255)` | Sim | Hash da senha (bcrypt/argon2) |
| cpf | `varchar(11)` (único) | Sim | CPF sem formatação |
| tipo | `user_role` (enum) | Sim | `paciente`/`profissional`/`gestor` |
| data_nascimento | `date` | Não | Data de nascimento |
| criado_em | `timestamp with time zone` | Sim (default now()) |Criação do registro |
| atualizado_em | `timestamp with time zone` | Sim (default now()) | Última atualização |

Tabela: postos

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| nome | `varchar(200)` | Sim | Nome do posto |
| endereco | `varchar(255)` | Sim | Endereço completo |
| bairro | `varchar(100)` | Sim | Bairro (ex.: Edson Queiroz) |
| lat | `numeric(10,7)` | Não | Latitude |
| lon | `numeric(10,7)` | Não | Longitude |
| criado_em | `timestamp` | Sim | Data de cadastro |

Tabela: consultas

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| paciente_id | `bigint FK -> users(id)` | Sim |Paciente |
| posto_id | `bigint FK -> postos(id)` | Sim |Posto |
| profissional_id |`bigint FK -> users(id)`|Não|Profissional (pode ser nulo antes da alocação)|
| data_hora |`timestamptz`|Sim | Data e hora da consulta|
| status | `consulta_status`(enum) | Sim | `agendada`/`realizada`/`cancelada`|
| motivo | `text` | Não| Motivo/observação|
| criado_em |`timestamp` |Sim| Criação do agendamento|

Tabela: prontuarios

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| consulta_id | `bigint FK -> consultas(id)` | Sim | Consulta associada |
| paciente_id | `bigint FK -> users(id)` | Sim | Paciente |
| descricao | `text` | Sim | Registro clínico |
| criado_em | `timestamp` | Sim | Data/hora do registro |
| criado_por | `bigint FK -> users(id)` | Sim | Profissional que registrou |

Tabela: receitas

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| consulta_id | `bigint FK -> consultas(id)` | Sim | Consulta relacionada |
| medico_id | `bigint FK -> users(id)` | Sim | Médico emissor |
| medicamentos | `text` | Sim | Texto livre com posologia |
| criado_em | `timestamp` | Sim | Data de emissão |

Tabela: campanhas

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| titulo | `varchar(200)` | Sim | Título da campanha |
| descricao | `text` | Sim | Detalhes |
| inicio | `date` | Sim | Data inicial |
| fim | `date` | Sim | Data final |
| status | `campanha_status` | Sim | `pendente`/`ativa`/`encerrada` |
| criado_em | `timestamp` | Sim | Cadastro |

Tabela: notificacoes

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| user_id | `bigint FK -> users(id)` | Sim | Destinatário |
| mensagem | `text` | Sim | Conteúdo |
| tipo | `notificacao_tipo` | Sim | `consulta`/`receita`/`campanha`|
| enviado_em | `timestamptz` | Sim | Horário de envio |
| lida | `boolean` | Sim (default false) | Flag leitura |

Tabela: logs

| Campo | Tipo | Obrigatório | Descrição |

| id | `bigserial PK` | Sim | Identificador |
| user_id | `bigint FK -> users(id)` | Não | Usuário causador (pode ser NULL para jobs) |
| acao | `varchar(200)` | Sim | Ação realizada (ex.: `criar_prontuario`) |
| detalhe | `text` | Não | JSON/texto com detalhes (ex.: diff) |
| criado_em | `timestamptz` | Sim | Timestamp |

5. DDL sugerido (PostgreSQL)

-- tipos ENUM
CREATE TYPE user_role AS ENUM ('paciente','profissional','gestor');
CREATE TYPE consulta_status AS ENUM ('agendada','realizada','cancelada');
CREATE TYPE campanha_status AS ENUM ('pendente','ativa','encerrada');
CREATE TYPE notificacao_tipo AS ENUM ('consulta','receita','campanha');

-- tabela users
CREATE TABLE users (
id bigserial PRIMARY KEY,
nome varchar(200) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
senha_hash varchar(255) NOT NULL,
cpf varchar(11) NOT NULL UNIQUE,
tipo user_role NOT NULL,
data_nascimento date,
criado_em timestamptz NOT NULL DEFAULT now(),
atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- tabela postos
CREATE TABLE postos (
id bigserial PRIMARY KEY,
nome varchar(200) NOT NULL,
endereco varchar(255) NOT NULL,
bairro varchar(100) NOT NULL,
lat numeric(10,7),
lon numeric(10,7),
criado_em timestamptz NOT NULL DEFAULT now()
);

-- tabela consultas
CREATE TABLE consultas (
id bigserial PRIMARY KEY,
paciente_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
posto_id bigint NOT NULL REFERENCES postos(id) ON DELETE RESTRICT,
profissional_id bigint REFERENCES users(id) ON DELETE SET NULL,
data_hora timestamptz NOT NULL,
status consulta_status NOT NULL DEFAULT 'agendada',
motivo text,
criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_consultas_paciente ON consultas(paciente_id);
CREATE INDEX idx_consultas_posto_data ON consultas(posto_id, data_hora);

-- tabela prontuarios
CREATE TABLE prontuarios (
id bigserial PRIMARY KEY,
consulta_id bigint NOT NULL REFERENCES consultas(id) ON DELETE CASCADE,
paciente_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
descricao text NOT NULL,
criado_em timestamptz NOT NULL DEFAULT now(),
criado_por bigint NOT NULL REFERENCES users(id) ON DELETE SET NULL
);

-- tabela receitas
CREATE TABLE receitas (
id bigserial PRIMARY KEY,
consulta_id bigint NOT NULL REFERENCES consultas(id) ON DELETE CASCADE,
medico_id bigint NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
medicamentos text NOT NULL,
criado_em timestamptz NOT NULL DEFAULT now()
);

-- tabela campanhas
CREATE TABLE campanhas (
id bigserial PRIMARY KEY,
titulo varchar(200) NOT NULL,
descricao text NOT NULL,
inicio date NOT NULL,
fim date NOT NULL,
status campanha_status NOT NULL DEFAULT 'pendente',
criado_em timestamptz NOT NULL DEFAULT now()
);

-- tabela notificacoes
CREATE TABLE notificacoes (
id bigserial PRIMARY KEY,
user_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
mensagem text NOT NULL,
tipo notificacao_tipo NOT NULL,
enviado_em timestamptz NOT NULL DEFAULT now(),
lida boolean NOT NULL DEFAULT false
);

CREATE INDEX idx_notificacoes_user ON notificacoes(user_id);

-- tabela logs
CREATE TABLE logs (
id bigserial PRIMARY KEY,
user_id bigint REFERENCES users(id) ON DELETE SET NULL,
acao varchar(200) NOT NULL,
detalhe text,
criado_em timestamptz NOT NULL DEFAULT now()
);

6. Índices, constraints e performance

- Índices recomendados:
  - consultas(paciente_id), consultas(posto_id, data_hora) — consultas rápidas por paciente/posto/data.
  - notificacoes(user_id) — buscar notificações de um usuário.
  - users(email), users(cpf) — unicidade para login e auditoria.
  - Constraint de integridade: ON DELETE acionado conforme importância do dado (ex.: CASCADE para dados dependentes).
  - Para relatórios pesados, usar materialized views ou read replicas.

7. Auditoria e conformidade (LGPD)
   - logs registra operações sensíveis (criação/edição/visualização de prontuários).
   - Considerar audit trigger (ex.: extensão pgaudit) ou triggers que gravem mudanças em tabelas clínicas.
   - Implementar retenção de dados e meio de anonimização caso o paciente solicite exclusão.
