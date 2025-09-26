-- SQL para executar no Supabase para implementar aprovação e criação de usuários

-- 1. Primeiro, verificar e criar a estrutura da tabela equipe
-- Criar tabela equipe se não existir
CREATE TABLE IF NOT EXISTS public.equipe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT,
  email TEXT,
  instituicao TEXT,
  papel VARCHAR(20) DEFAULT 'membro',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar colunas se a tabela já existir mas não tiver essas colunas
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS nome TEXT;
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS instituicao TEXT;
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS papel VARCHAR(20) DEFAULT 'membro';
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.equipe ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Criar índice único no email se não existir (apenas se a coluna email não for null)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'equipe_email_unique'
  ) THEN
    -- Primeiro, limpar emails duplicados ou nulos se existirem
    DELETE FROM public.equipe 
    WHERE email IS NULL OR email = '';
    
    -- Então criar o índice único
    CREATE UNIQUE INDEX equipe_email_unique ON public.equipe(email) 
    WHERE email IS NOT NULL;
  END IF;
END $$;

-- 2. Inserir o admin inicial (modifique o email conforme necessário)
INSERT INTO public.equipe (nome, email, instituicao, papel, is_admin, created_at)
VALUES ('Administrador', 'krlloz@live.com', 'Administração', 'admin', true, NOW())
ON CONFLICT (email) 
DO UPDATE SET 
  papel = 'admin', 
  is_admin = true
WHERE public.equipe.email = 'krlloz@live.com';

-- 3. Função para aprovar solicitação e criar usuário
CREATE OR REPLACE FUNCTION aprovar_criar_usuario(
  p_solicitacao_id UUID,
  p_email_admin TEXT
) RETURNS JSON AS $$
DECLARE
  v_solicitacao RECORD;
  v_admin_id UUID;
  v_new_user_id UUID;
  v_result JSON;
BEGIN
  -- Verificar se quem está aprovando é admin
  SELECT id INTO v_admin_id 
  FROM public.equipe 
  WHERE email = p_email_admin AND is_admin = true;
  
  IF v_admin_id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Usuário não tem permissão para aprovar solicitações'
    );
  END IF;

  -- Buscar a solicitação
  SELECT * INTO v_solicitacao 
  FROM public.solicitacoes_acesso 
  WHERE id = p_solicitacao_id AND status = 'pendente';
  
  IF v_solicitacao IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Solicitação não encontrada ou já processada'
    );
  END IF;

  -- Gerar UUID para o novo usuário (será usado quando o usuário for criado no auth)
  v_new_user_id := gen_random_uuid();

  -- Inserir na tabela equipe
  INSERT INTO public.equipe (
    id,
    nome,
    email,
    instituicao,
    papel,
    is_admin,
    created_at
  ) VALUES (
    v_new_user_id,
    v_solicitacao.nome,
    v_solicitacao.email,
    v_solicitacao.instituicao,
    'membro',
    false,
    NOW()
  );

  -- Atualizar status da solicitação
  UPDATE public.solicitacoes_acesso 
  SET 
    status = 'aprovado',
    aprovado_por = v_admin_id,
    aprovado_em = NOW(),
    user_id_aprovado = v_new_user_id
  WHERE id = p_solicitacao_id;

  RETURN json_build_object(
    'success', true,
    'message', 'Usuário aprovado e adicionado à equipe',
    'user_id', v_new_user_id,
    'email', v_solicitacao.email,
    'senha_temporaria', v_solicitacao.senha  -- Para criar a conta auth
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Função para promover usuário a admin
CREATE OR REPLACE FUNCTION promover_usuario_admin(
  p_user_id UUID,
  p_email_admin TEXT
) RETURNS JSON AS $$
DECLARE
  v_admin_id UUID;
BEGIN
  -- Verificar se quem está promovendo é admin
  SELECT id INTO v_admin_id 
  FROM public.equipe 
  WHERE email = p_email_admin AND is_admin = true;
  
  IF v_admin_id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Usuário não tem permissão para promover outros usuários'
    );
  END IF;

  -- Promover o usuário
  UPDATE public.equipe 
  SET papel = 'admin', is_admin = true 
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Usuário não encontrado'
    );
  END IF;

  RETURN json_build_object(
    'success', true,
    'message', 'Usuário promovido a administrador'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Função para listar membros da equipe (para gerenciamento)
CREATE OR REPLACE FUNCTION listar_equipe(
  p_email_admin TEXT
) RETURNS TABLE(
  id UUID,
  nome TEXT,
  email TEXT,
  instituicao TEXT,
  papel VARCHAR(20),
  is_admin BOOLEAN,
  created_at TIMESTAMPTZ
) AS $$
DECLARE
  v_admin_id UUID;
BEGIN
  -- Verificar se quem está listando é admin
  SELECT equipe.id INTO v_admin_id 
  FROM public.equipe 
  WHERE equipe.email = p_email_admin AND equipe.is_admin = true;
  
  IF v_admin_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não tem permissão para listar equipe';
  END IF;

  -- Retornar lista da equipe
  RETURN QUERY 
  SELECT e.id, e.nome, e.email, e.instituicao, e.papel, e.is_admin, e.created_at
  FROM public.equipe e
  ORDER BY e.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Função para remover usuário da equipe
CREATE OR REPLACE FUNCTION remover_usuario_equipe(
  p_user_id UUID,
  p_email_admin TEXT
) RETURNS JSON AS $$
DECLARE
  v_admin_id UUID;
BEGIN
  -- Verificar se quem está removendo é admin
  SELECT id INTO v_admin_id 
  FROM public.equipe 
  WHERE email = p_email_admin AND is_admin = true;
  
  IF v_admin_id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Usuário não tem permissão para remover outros usuários'
    );
  END IF;

  -- Não permitir que admin remova a si mesmo
  IF v_admin_id = p_user_id THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Não é possível remover sua própria conta'
    );
  END IF;

  -- Remover o usuário
  DELETE FROM public.equipe WHERE id = p_user_id;

  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Usuário não encontrado'
    );
  END IF;

  RETURN json_build_object(
    'success', true,
    'message', 'Usuário removido da equipe'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;