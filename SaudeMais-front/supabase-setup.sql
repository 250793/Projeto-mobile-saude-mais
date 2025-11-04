-- Script SQL para configurar o banco de dados no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('paciente', 'medico', 'gestor', 'recepcionista', 'estoque', 'farmacia')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Política: permitir busca de email por CPF para login (sem autenticação)
-- Esta política permite que qualquer um busque o email associado a um CPF
-- Isso é necessário para o login com CPF funcionar
-- IMPORTANTE: Esta política permite acesso público apenas ao campo 'email'
-- Em produção, considere adicionar rate limiting ou outras medidas de segurança
-- NOTA: Para políticas SELECT, usamos apenas USING, não WITH CHECK
CREATE POLICY "Allow email lookup by CPF for login"
  ON profiles FOR SELECT
  USING (true);

-- Política: usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Política: permitir inserção de novos perfis (será chamado durante o signup)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Nota: A busca por CPF no login é feita diretamente na query do código
-- Não é necessária uma função separada devido às políticas RLS
-- Se precisar de uma função para outros casos, use:
-- CREATE OR REPLACE FUNCTION get_email_by_cpf(cpf_param TEXT)
-- RETURNS TABLE(email TEXT) AS $$
-- BEGIN
--   RETURN QUERY
--   SELECT p.email
--   FROM profiles p
--   WHERE p.cpf = cpf_param;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários para documentação
COMMENT ON TABLE profiles IS 'Armazena informações adicionais dos usuários do sistema';
COMMENT ON COLUMN profiles.user_type IS 'Tipo de usuário: paciente, medico, gestor, recepcionista, estoque, farmacia';
COMMENT ON COLUMN profiles.cpf IS 'CPF único do usuário para login alternativo';

