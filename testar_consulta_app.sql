-- Testar se a aplicação consegue consultar dados do usuário
-- Execute no painel SQL do Supabase

-- 1. Simular a consulta que a aplicação faz (sem autenticação específica)
-- Substitua pelo email do administrador
SELECT nome, email, papel 
FROM public.equipe 
WHERE email = 'SEU_EMAIL_ADMIN_AQUI';

-- 2. Verificar se todas as consultas básicas funcionam
SELECT COUNT(*) as total_usuarios FROM public.equipe;

-- 3. Testar se conseguimos atualizar dados (simular upsert)
-- Substitua pelo email do administrador
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Admin Teste', 'SEU_EMAIL_ADMIN_AQUI', 'Instituição Admin', 'administrador')
ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    papel = EXCLUDED.papel,
    updated_at = NOW()
RETURNING *;

-- 4. Se o problema persistir, remover políticas mais restritivas temporariamente
-- (Execute apenas se necessário)
-- DROP POLICY IF EXISTS "equipe_read_safe" ON public.equipe;
-- DROP POLICY IF EXISTS "equipe_insert_safe" ON public.equipe;
-- DROP POLICY IF EXISTS "equipe_update_safe" ON public.equipe;