-- Políticas RLS mais permissivas (temporárias)
-- Execute no painel SQL do Supabase se houver problemas

-- 1. Remover políticas existentes
DROP POLICY IF EXISTS "equipe_read_safe" ON public.equipe;
DROP POLICY IF EXISTS "equipe_insert_safe" ON public.equipe;  
DROP POLICY IF EXISTS "equipe_update_safe" ON public.equipe;
DROP POLICY IF EXISTS "equipe_delete_safe" ON public.equipe;

-- 2. Criar políticas mais permissivas
-- Permitir tudo para authenticated (a aplicação controlará as permissões)
CREATE POLICY "equipe_allow_all_authenticated" ON public.equipe
FOR ALL 
TO authenticated, service_role
USING (true)
WITH CHECK (true);

-- Permitir leitura para anon (para consultas públicas se necessário)  
CREATE POLICY "equipe_allow_read_anon" ON public.equipe
FOR SELECT 
TO anon
USING (true);

-- 3. Testar consulta
SELECT nome, email, papel FROM public.equipe LIMIT 3;