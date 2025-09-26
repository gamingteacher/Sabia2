-- VERSÃO SIMPLIFICADA - Execute este se o outro der erro

-- 1. Dropar e recriar a tabela equipe (CUIDADO: apaga dados existentes)
DROP TABLE IF EXISTS public.equipe CASCADE;

-- 2. Criar tabela equipe do zero
CREATE TABLE public.equipe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT,
  email TEXT,
  instituicao TEXT,
  papel VARCHAR(20) DEFAULT 'membro',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Criar índice único no email
CREATE UNIQUE INDEX equipe_email_unique ON public.equipe(email) WHERE email IS NOT NULL;

-- 4. Inserir admin
INSERT INTO public.equipe (nome, email, instituicao, papel, is_admin)
VALUES ('Administrador', 'krlloz@live.com', 'Administração', 'admin', true);

-- 5. Verificar se inseriu corretamente
SELECT * FROM public.equipe WHERE email = 'krlloz@live.com';

-- 6. Todas as funções RPC (copie daqui as funções do arquivo principal)
-- aprovar_criar_usuario, promover_usuario_admin, listar_equipe, remover_usuario_equipe