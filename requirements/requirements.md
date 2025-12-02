📄 Requisitos – Plataforma de Gestão de Postos de Saúde Comunitários

1. Requisitos Funcionais (RF)

- RF01: O sistema deve permitir o cadastro de pacientes, profissionais de saúde e gestores.
- RF02: O sistema deve possibilitar o agendamento de consultas, incluindo confirmação e cancelamento.
- RF03: O sistema deve disponibilizar o prontuário simplificado do paciente (consultas, exames, histórico).
- RF04: O sistema deve permitir que médicos registrem e pacientes consultem receitas digitais.
- RF05: O sistema deve permitir a divulgação e gerenciamento de campanhas de saúde (ex.: vacinação).
- RF06: O sistema deve enviar notificações automáticas de consultas e campanhas aos pacientes.
- RF07: O sistema deve disponibilizar um dashboard para gestores, com relatórios e estatísticas de atendimentos.
- RF08: O sistema deve oferecer canal de feedback da comunidade para avaliação dos serviços.

2. Requisitos Não Funcionais (RNF)

- RNF01: O sistema deve ser multiplataforma (Web e Mobile).
- RNF02: O sistema deve atender à LGPD, garantindo privacidade e segurança dos dados médicos.
- RNF03: O sistema deve estar disponível 24/7, com tempo de resposta inferior a 2 segundos em 95% das requisições.
- RNF04: O sistema deve ser acessível e inclusivo, com design amigável para idosos e pessoas com baixa alfabetização digital.
- RNF05: O sistema deve ser escalável, suportando aumento de usuários sem perda significativa de desempenho.
- RNF06: O sistema deve possuir mecanismos de backup diário e recuperação em caso de falhas.

3. Regras de Negócio (RN)

- RN01: Apenas médicos podem registrar receitas digitais.
- RN02: Pacientes podem cancelar consultas somente com antecedência mínima de 24h.
- RN03: Campanhas de saúde devem ser aprovadas por um gestor antes de serem publicadas.
- RN04: Pacientes só podem acessar seus próprios prontuários, nunca o de outros usuários.
- RN05: Todas as operações do sistema devem ser registradas em logs para auditoria.

4. Perfis de Usuários

- Paciente: agenda consultas, consulta seu prontuário, acessa receitas e campanhas, recebe notificações.
- Profissional de Saúde: registra atendimentos, atualiza prontuários, emite receitas digitais.
- Gestor: gerencia o posto, aprova campanhas, acompanha relatórios e indicadores de atendimento.

5. Histórias de Usuário

Paciente:

- “Como paciente, quero visualizar meu histórico de consultas, para acompanhar minha saúde.”
- “Como paciente, quero receber uma notificação quando minha consulta for confirmada, para não me esquecer.”
  Profissional de Saúde:
- “Como médico, quero registrar receitas digitais, para que os pacientes possam acessá-las com facilidade.”
  Gestor:
- “Como gestor, quero visualizar relatórios de atendimentos realizados, para avaliar a eficiência do posto.”
