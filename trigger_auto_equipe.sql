-- Função para criar automaticamente entrada na tabela equipe quando usuário se registra
-- Execute no painel SQL do Supabase

-- Criar função que é executada quando novo usuário é criado
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.equipe (email, nome, instituicao, papel, created_at, updated_at)
  VALUES (
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nome', ''),
    COALESCE(NEW.raw_user_meta_data->>'instituicao', ''),
    'pendente',
    NEW.created_at,
    NEW.created_at
  )
  ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    instituicao = EXCLUDED.instituicao,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger que executa a função quando usuário é inserido em auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verificar se o trigger foi criado
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';