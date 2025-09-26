-- Diagnóstico completo da tabela equipe
-- Execute no painel SQL do Supabase

-- 1. Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'equipe'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar TODAS as constraints da tabela
SELECT 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'equipe' 
    AND tc.table_schema = 'public';

-- 3. Verificar indexes da tabela
SELECT 
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE tablename = 'equipe' 
    AND schemaname = 'public';

-- 4. Tentar criar a constraint novamente (caso tenha sido perdida)
ALTER TABLE public.equipe 
ADD CONSTRAINT equipe_email_unique UNIQUE (email);

-- 5. Testar inserção simples SEM ON CONFLICT primeiro
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste Simples', 'teste-simples@exemplo.com', 'Instituição Teste', 'pendente')
RETURNING *;