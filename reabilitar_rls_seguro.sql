-- Reabilitar RLS com políticas corretas e sem recursão
-- Execute no painel SQL do Supabase

-- 1. Reabilitar RLS
ALTER TABLE public.equipe ENABLE ROW LEVEL SECURITY;

-- 2. Criar políticas simples e seguras
-- Leitura: usuários autenticados podem ler todos os registros
CREATE POLICY "equipe_read_safe" ON public.equipe
FOR SELECT 
TO authenticated, anon
USING (true);

-- Inserção: permitir para service_role (triggers) e authenticated
CREATE POLICY "equipe_insert_safe" ON public.equipe
FOR INSERT 
TO authenticated, service_role
WITH CHECK (true);

-- Atualização: permitir para service_role e authenticated (será controlado pela aplicação)
CREATE POLICY "equipe_update_safe" ON public.equipe
FOR UPDATE 
TO authenticated, service_role
USING (true)
WITH CHECK (true);

-- Exclusão: apenas service_role (será controlado pela aplicação)
CREATE POLICY "equipe_delete_safe" ON public.equipe
FOR DELETE 
TO service_role
USING (true);

-- 3. Testar se funciona
SELECT nome, email, papel FROM public.equipe LIMIT 3;