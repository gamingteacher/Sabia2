-- Políticas RLS para a tabela equipe
-- Execute no painel SQL do Supabase

-- Habilitar RLS na tabela
ALTER TABLE public.equipe ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura de dados próprios ou por administradores
CREATE POLICY "Usuários podem ver próprios dados ou admins veem todos" ON public.equipe
  FOR SELECT 
  USING (
    auth.email() = email OR 
    EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE email = auth.email() 
      AND papel = 'administrador'
    )
  );

-- Política para permitir inserção de novos usuários
CREATE POLICY "Permitir inserção de novos usuários" ON public.equipe
  FOR INSERT 
  WITH CHECK (
    auth.email() = email OR
    EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE email = auth.email() 
      AND papel = 'administrador'
    )
  );

-- Política para permitir atualização por administradores ou próprio usuário
CREATE POLICY "Administradores podem atualizar qualquer usuário" ON public.equipe
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE email = auth.email() 
      AND papel = 'administrador'
    )
  );

-- Política para permitir deleção apenas por administradores
CREATE POLICY "Apenas administradores podem deletar" ON public.equipe
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE email = auth.email() 
      AND papel = 'administrador'
    )
  );