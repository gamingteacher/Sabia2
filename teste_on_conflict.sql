-- Teste de ON CONFLICT com diferentes abordagens
-- Execute no painel SQL do Supabase

-- 1. Tentar inserir o mesmo email novamente (deve gerar erro de constraint)
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste Duplicado', 'teste-simples@exemplo.com', 'Outra Instituição', 'pendente');

-- Se deu erro acima, então a constraint existe. Vamos testar ON CONFLICT:

-- 2. Teste ON CONFLICT com nome da constraint explícito
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste ON CONFLICT', 'teste-simples@exemplo.com', 'Instituição Atualizada', 'membro')
ON CONFLICT ON CONSTRAINT equipe_email_unique DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  papel = EXCLUDED.papel,
  updated_at = NOW()
RETURNING *;

-- 3. Se não funcionou, testar sem especificar constraint
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Teste ON CONFLICT 2', 'teste-simples@exemplo.com', 'Instituição Final', 'equipe')
ON CONFLICT (email) DO UPDATE SET
  nome = EXCLUDED.nome,
  instituicao = EXCLUDED.instituicao,
  papel = EXCLUDED.papel,
  updated_at = NOW()
RETURNING *;