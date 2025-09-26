-- Limpar TODAS as políticas e criar apenas as necessárias
-- Execute no painel SQL do Supabase

-- 1. Remover TODAS as políticas existentes
DROP POLICY IF EXISTS "Administradores podem atualizar qualquer usuário" ON public.equipe;
DROP POLICY IF EXISTS "Apenas administradores podem deletar" ON public.equipe;
DROP POLICY IF EXISTS "Permitir inserção de novos usuários" ON public.equipe;
DROP POLICY IF EXISTS "Usuários podem ver próprios dados ou admins veem todos" ON public.equipe;
DROP POLICY IF EXISTS "equipe_delete" ON public.equipe;
DROP POLICY IF EXISTS "equipe_delete_safe" ON public.equipe;
DROP POLICY IF EXISTS "equipe_insert" ON public.equipe;
DROP POLICY IF EXISTS "equipe_insert_safe" ON public.equipe;
DROP POLICY IF EXISTS "equipe_read" ON public.equipe;
DROP POLICY IF EXISTS "equipe_read_safe" ON public.equipe;
DROP POLICY IF EXISTS "equipe_update" ON public.equipe;
DROP POLICY IF EXISTS "equipe_update_safe" ON public.equipe;

-- 2. Criar apenas UMA política simples para cada operação
-- Leitura: todos os usuários authenticated podem ler
CREATE POLICY "equipe_select_only" ON public.equipe
FOR SELECT 
TO authenticated, anon, service_role
USING (true);

-- Inserção: triggers e usuários authenticated
CREATE POLICY "equipe_insert_only" ON public.equipe
FOR INSERT 
TO authenticated, service_role
WITH CHECK (true);

-- Atualização: todos authenticated (aplicação controlará)
CREATE POLICY "equipe_update_only" ON public.equipe
FOR UPDATE 
TO authenticated, service_role
USING (true)
WITH CHECK (true);

-- Exclusão: apenas service_role
CREATE POLICY "equipe_delete_only" ON public.equipe
FOR DELETE 
TO service_role
USING (true);

-- 3. Verificar que só restaram 4 políticas
SELECT COUNT(*) as total_policies 
FROM pg_policies 
WHERE tablename = 'equipe';

-- 4. Testar consulta do admin
SELECT nome, email, papel 
FROM public.equipe 
WHERE email = 'krlloz@live.com';