-- Script completo para testar o sistema após correções
-- Execute no painel SQL do Supabase

-- 1. Limpar dados de teste antigos (se existirem)
DELETE FROM public.equipe WHERE email LIKE '%teste%';

-- 2. Testar inserção manual com a nova constraint
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Usuario Teste', 'usuario.teste@exemplo.com', 'Instituição Teste', 'pendente')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  updated_at = NOW()
RETURNING *;

-- 3. Verificar se o trigger está funcionando
-- (Este comando simula o que acontece quando um usuário se registra)
-- NOTA: Este teste só funcionará se você tiver acesso direto à tabela auth.users

-- 4. Verificar dados inseridos
SELECT * FROM public.equipe WHERE email = 'usuario.teste@exemplo.com';

-- 5. Verificar estrutura da tabela e constraints
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    tc.constraint_type
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
WHERE 
    tc.table_name = 'equipe' 
    AND tc.table_schema = 'public';

-- 6. Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'equipe';