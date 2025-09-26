-- Atualizar trigger para usar ON CONFLICT correto
-- Execute no painel SQL do Supabase

-- 1. Recriar a função handle_new_user com sintaxe correta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_email TEXT;
    user_name TEXT;
BEGIN
    -- Extrair email e nome do usuário
    user_email := NEW.email;
    user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);
    
    -- Inserir na tabela equipe com ON CONFLICT funcionando
    INSERT INTO public.equipe (nome, email, instituicao, papel)
    VALUES (user_name, user_email, '', 'pendente')
    ON CONFLICT (email) DO UPDATE SET
        nome = EXCLUDED.nome,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Verificar se o trigger ainda existe
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created'
  AND event_object_table = 'users';

-- 3. Testar inserção manual simulando novo usuário
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Novo Usuario Teste', 'novousuario@teste.com', '', 'pendente')
ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    updated_at = NOW()
RETURNING *;