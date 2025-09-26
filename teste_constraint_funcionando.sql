-- Teste apenas a inserção, já que a constraint existe
-- Execute no painel SQL do Supabase

-- 1. Verificar se a constraint existe (deve retornar 1 linha)
SELECT constraint_name, table_name, column_name
FROM information_schema.constraint_column_usage 
WHERE table_name = 'equipe' 
  AND table_schema = 'public'
  AND constraint_name = 'equipe_email_unique';

-- 2. Testar inserção com ON CONFLICT (agora deve funcionar)
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste Usuario', 'teste@exemplo.com', 'Instituição Teste', 'pendente')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  updated_at = NOW()
RETURNING *;

-- 3. Verificar o registro criado
SELECT * FROM public.equipe WHERE email = 'teste@exemplo.com';