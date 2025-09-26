-- Solução: Remover o index e criar constraint UNIQUE correta
-- Execute no painel SQL do Supabase

-- 1. Remover o index atual (que não funciona com ON CONFLICT)
DROP INDEX IF EXISTS public.equipe_email_unique;

-- 2. Criar a constraint UNIQUE correta
ALTER TABLE public.equipe 
ADD CONSTRAINT equipe_email_unique UNIQUE (email);

-- 3. Verificar se a constraint foi criada corretamente
SELECT 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'equipe' 
    AND tc.table_schema = 'public'
    AND tc.constraint_type = 'UNIQUE';

-- 4. Testar ON CONFLICT (agora deve funcionar)
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste ON CONFLICT Final', 'teste-simples@exemplo.com', 'Instituição Atualizada', 'membro')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  papel = EXCLUDED.papel,
  updated_at = NOW()
RETURNING *;

-- 5. Verificar o resultado final
SELECT * FROM public.equipe WHERE email = 'teste-simples@exemplo.com';