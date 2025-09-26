-- Diagnóstico: verificar se o admin existe e as políticas estão funcionando
-- Execute no painel SQL do Supabase

-- 1. Listar todos os usuários da tabela equipe
SELECT id, nome, email, papel, created_at 
FROM public.equipe 
ORDER BY created_at;

-- 2. Verificar se existe pelo menos um administrador
SELECT COUNT(*) as total_admins 
FROM public.equipe 
WHERE papel = 'administrador';

-- 3. Verificar as políticas RLS ativas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'equipe';

-- 4. Testar consulta que a aplicação faz (simular usuário logado)
-- Substitua 'email_do_admin@exemplo.com' pelo email do seu admin
SELECT nome, email, papel 
FROM public.equipe 
WHERE email = 'email_do_admin@exemplo.com';