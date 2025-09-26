-- Script para testar inserção na tabela equipe
-- Execute este comando no painel SQL do Supabase

-- 1. Verificar se a tabela existe e sua estrutura
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'equipe'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'equipe';

-- 3. Testar inserção manual (substitua com dados reais)
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste Usuario', 'teste@exemplo.com', 'Instituição Teste', 'pendente')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  papel = EXCLUDED.papel,
  updated_at = NOW()
RETURNING *;

-- 4. Verificar se o registro foi criado
SELECT * FROM public.equipe WHERE email = 'teste@exemplo.com';