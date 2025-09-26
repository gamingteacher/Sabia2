-- Corrigir políticas RLS que estão causando recursão infinita
-- Execute no painel SQL do Supabase

-- 1. Remover todas as políticas RLS existentes da tabela equipe
DROP POLICY IF EXISTS "equipe_select_policy" ON public.equipe;
DROP POLICY IF EXISTS "equipe_insert_policy" ON public.equipe;
DROP POLICY IF EXISTS "equipe_update_policy" ON public.equipe;
DROP POLICY IF EXISTS "equipe_delete_policy" ON public.equipe;
DROP POLICY IF EXISTS "Permitir leitura para usuários autenticados" ON public.equipe;
DROP POLICY IF EXISTS "Permitir inserção para novos usuários" ON public.equipe;

-- 2. Desabilitar RLS temporariamente para resolver o problema
ALTER TABLE public.equipe DISABLE ROW LEVEL SECURITY;

-- 3. Criar políticas RLS mais simples e sem recursão
ALTER TABLE public.equipe ENABLE ROW LEVEL SECURITY;

-- 4. Política de leitura: usuários autenticados podem ler todos os registros
CREATE POLICY "equipe_read" ON public.equipe
FOR SELECT 
TO authenticated
USING (true);

-- 5. Política de inserção: apenas para triggers e service_role
CREATE POLICY "equipe_insert" ON public.equipe
FOR INSERT 
TO authenticated, service_role
WITH CHECK (true);

-- 6. Política de atualização: usuários podem atualizar seu próprio registro OU admins podem atualizar qualquer um
CREATE POLICY "equipe_update" ON public.equipe
FOR UPDATE 
TO authenticated
USING (
  auth.uid()::text IN (
    SELECT auth.users.id::text 
    FROM auth.users 
    WHERE auth.users.email = equipe.email
  )
  OR 
  EXISTS (
    SELECT 1 FROM public.equipe admin_check
    WHERE admin_check.email = auth.jwt()->>'email'
    AND admin_check.papel IN ('administrador', 'equipe')
  )
);

-- 7. Política de exclusão: apenas administradores
CREATE POLICY "equipe_delete" ON public.equipe
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.equipe admin_check
    WHERE admin_check.email = auth.jwt()->>'email'
    AND admin_check.papel = 'administrador'
  )
);

-- 8. Testar se a recursão foi corrigida
SELECT nome, email, papel FROM public.equipe LIMIT 3;