-- Correção da tabela equipe - adicionar constraint UNIQUE no email
-- Execute no painel SQL do Supabase

-- 1. Verificar estrutura atual da tabela
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'equipe'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Adicionar constraint UNIQUE no campo email se não existir
ALTER TABLE public.equipe 
ADD CONSTRAINT equipe_email_unique UNIQUE (email);

-- 3. Verificar se a constraint foi criada
SELECT constraint_name, constraint_type, table_name, column_name
FROM information_schema.constraint_column_usage 
WHERE table_name = 'equipe' 
  AND table_schema = 'public'
  AND constraint_name = 'equipe_email_unique';

-- 4. Testar inserção novamente (substitua com dados reais)
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste Usuario', 'teste@exemplo.com', 'Instituição Teste', 'pendente')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  updated_at = NOW()
RETURNING *;