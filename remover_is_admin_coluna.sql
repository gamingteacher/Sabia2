-- Script para remover a coluna is_admin da tabela equipe
-- Execute este comando no painel SQL do Supabase

ALTER TABLE public.equipe DROP COLUMN IF EXISTS is_admin;

-- Verificar se a coluna foi removida
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'equipe'
  AND table_schema = 'public'
ORDER BY ordinal_position;