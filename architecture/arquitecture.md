Arquitetura do Sistema — Plataforma de Gestão de Postos de Saúde Comunitários

Resumo:
Documento que descreve a arquitetura proposta para a Plataforma de Gestão de Postos de Saúde Comunitários — aplicação multiplataforma para agendamentos, prontuários simplificados, acompanhamento de campanhas e envio de notificações. A arquitetura prioriza segurança (LGPD), escalabilidade, observabilidade e facilidade de manutenção e evolução.

1. Visão Geral e Objetivos da Arquitetura

- Suportar acesso Web (gestores/profissionais) e Mobile (pacientes).
- Garantir segurança e confidencialidade dos dados sensíveis (prontuários, receitas).
- Facilitar integrações com serviços externos (mapas, notificações).
- Permitir implantação incremental e evolução (modular monolith → microservices se necessário).
- Atender requisitos não funcionais: disponibilidade, performance, escalabilidade e usabilidade.

2. Padrões Arquiteturais e Decisões Técnicas
   Padrões adotados

- Cliente-Servidor (n-tier) — separação clara entre apresentação, negócio e persistência.
- RESTful API — comunicação padronizada entre frontends e backend; documentação com OpenAPI/Swagger.
- MVC (no backend) — Controller → Service → Repository.
- Modular Monolith inicialmente, com possibilidade de extrair microserviços (notificações, relatórios) futuramente.
- Token-based Authentication (JWT) com roles (patient / health-professional / manager).
- 12-factor app para facilitar deploys e portabilidade.

Justificativas tecnológicas (resumo)

- React / React Native: acelera desenvolvimento e possibilita reuso de componentes e lógica.
- Node.js + Express: produtividade para APIs REST, vasto ecossistema de middlewares.
- PostgreSQL: integridade transacional, suporte a consultas complexas e extensão JSONB.
- Firebase Cloud Messaging (FCM): envio de push cross-platform simplificado.
- Google Maps API: localização e visualização dos postos.
- Docker + CI/CD (GitHub Actions): build e deploy consistentes.

3. Componentes do Sistema
   Frontend

- Web App (React.js): Painel do gestor, interface do profissional (agenda, prontuário).
- Mobile App (React Native): Interface do paciente (agendamento, histórico, notificações, receitas).

Backend

- API REST (Node.js + Express): endpoints de autenticação, usuários, agendamentos, prontuários, receitas, campanhas, notificações e relatórios.
- Camadas: Controllers → Services → Repositories/DAOs.

Persistência e Storage

- Banco de Dados Relacional (PostgreSQL): tabelas principais: users, postos, consultas, prontuarios, receitas, campanhas, notificacoes, logs, roles.
- Object storage (S3 ou equivalente): anexos e exames, com políticas de acesso.

Serviços Externos

- Firebase Cloud Messaging (FCM) — notificações push.
- Google Maps API — geolocalização.
- SMTP/Email provider — envio de confirmações e notificações por e-mail.
- Ferramentas de observability (Sentry / ELK / Datadog) — logs, traces e métricas.

4. Diagrama de Arquitetura (Mermaid)

flowchart LR
subgraph Client
A[Web (React)] -->|HTTPS| API
B[Mobile (React Native)] -->|HTTPS| API
end

subgraph Backend
API[API REST - Node.js/Express]
Auth[Auth Service (JWT)]
API --> Auth
API --> DB[(PostgreSQL)]
API --> Notif[Notification Service]
API --> Storage[(Object Storage)]
API --> Maps[Google Maps API]
end

subgraph External
FCM[Firebase Cloud Messaging]
GM[Google Maps]
SMTP[SMTP/Email]
end

Notif --> FCM
Maps --> GM
API --> SMTP

5. Fluxos Principais (exemplos)
   Fluxo: Agendamento de Consulta

1.Paciente solicita agendamento via app (POST /consultas).
2.API valida disponibilidade e regras (ex.: janelas de horários, limite por paciente).
3.Agendamento persistido em consultas (PostgreSQL).
4.Notificação é enfileirada e enviada via FCM/email.
5.Logs de auditoria gravados para conformidade.

Fluxo: Registro de Atendimento / Prontuário

1.Profissional autentica e cria/atualiza prontuário (POST/PUT /prontuarios/:id).
2.Backend persiste e gera entrada de log/auditoria.
3.Se receita for criada, registro em receitas e notificação ao paciente.

Fluxo: Publicação de Campanha

1.Gestor cria campanha (status = pending).
2.Aprovação por outro gestor altera status para active.
3.Campanha publicada e usuários elegíveis são notificados.

6. Segurança e Conformidade (LGPD)

- Autenticação/Autorização: JWT + refresh tokens; RBAC para controle de acesso.
- Criptografia: TLS/HTTPS para transporte; criptografia em repouso para backups/storage sensível.
- Auditoria: logs de acesso e operações sensíveis (criação, leitura, atualização, deleção de prontuários).
- Consentimento: registro do consentimento de uso de dados do paciente.
- Política de retenção e anonimização: procedimentos de exclusão/anonimização conforme demanda e lei.
- Boas práticas: minimizar dados pessoais expostos em logs, mascaramento quando necessário.

7. Escalabilidade e Resiliência

- Containerização (Docker): padroniza execução e facilita escalonamento.
- Escalabilidade horizontal do backend: réplicas do container em orquestrador (Render / Kubernetes / ECS).
- Read replicas para PostgreSQL: para suportar leituras intensas (dashboards).
- Fila assíncrona (Redis / RabbitMQ) — opcional: processar envios massivos de notificações e jobs demorados.
- Backups e failover: backups diários e plano de recuperação.

8. Observabilidade e Testes

- Logs estruturados com correlation-id por requisição.
- Métricas a coletar: latência, erro 5xx, throughput, uso de recursos.
- Tracing / APM: para investigar latências em cadeia (opcional: Jaeger / Datadog).
- Testes: unitários, integração e end-to-end; Postman collection para testes manuais.
- Pipeline CI/CD: GitHub Actions para build, testes e deploy em staging/prod.

9. Requisitos Não Funcionais atendidos pela arquitetura

- Disponibilidade: deploy em plataforma com auto-scaling; redundância de serviços.
- Performance: caching em endpoints de leitura frequente; read replicas.
- Segurança: TLS, RBAC, auditoria e criptografia.
- Usabilidade/Acessibilidade: frontends pensados para públicos com baixa alfabetização digital e idosos.
- Escalabilidade: arquitetura modular permitindo escalar componentes individualmente.

10. Deployment e Infra Recomendada

Ambientes: development, staging, production.

- Infra: Docker + Render / Heroku / AWS (EKS/ECS + RDS) / DigitalOcean.
- CI/CD: GitHub Actions → build → testes → docker image → deploy automático (staging) e deploy por tag
  (production).
- Secrets: armazenar em Secret Manager / environment variables protegidas.
- Backups: agendados via RDS/DB backups ou scripts agendados; retenção conforme política.

11. Recomendações para Etapa 2 (N708)

- Prioridade de implementação:
- Estrutura do backend com autenticação, modelagem inicial e endpoints /users, /consultas, /prontuarios.
- Migrations e seeds do banco (PostgreSQL).
- Frontend Web: telas de cadastro, agendamento e dashboard básico.
- Testes automatizados para endpoints principais.
- Integração com FCM para notificações básicas.
- Documentação OpenAPI e Postman collection para testes.

12. Referências e Ferramentas Sugeridas

- Diagramas & Docs: Swagger / OpenAPI, Draw.io, Mermaid, Figma.
- DB Modeling: dbdiagram.io, pgAdmin.
- DevOps: Docker, GitHub Actions, Render/AWS.
- Observability: Sentry, ELK stack, Datadog.
- APIs: Firebase Cloud Messaging, Google Maps API.
