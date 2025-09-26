-- ALTERNATIVA: Desabilitar RLS completamente (temporário)
-- Execute no painel SQL do Supabase se o erro persistir

-- Desabilitar RLS completamente
ALTER TABLE public.equipe DISABLE ROW LEVEL SECURITY;

-- Testar acesso
SELECT 'RLS desabilitado com sucesso' as status;