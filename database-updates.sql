-- Adicionar coluna slug à tabela paginas_relacionadas
-- Execute este script no Supabase SQL Editor

-- 1. Adicionar a coluna slug
ALTER TABLE public.paginas_relacionadas 
ADD COLUMN slug TEXT;

-- 2. Criar índice único para o slug (para URLs amigáveis)
CREATE UNIQUE INDEX paginas_relacionadas_slug_idx 
ON public.paginas_relacionadas (slug);

-- 3. Função para gerar slug automaticamente
CREATE OR REPLACE FUNCTION generate_slug(titulo TEXT, id INTEGER)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          REGEXP_REPLACE(
            REGEXP_REPLACE(
              REGEXP_REPLACE(
                REGEXP_REPLACE(titulo, '[áàâãäå]', 'a', 'g'),
                '[éèêë]', 'e', 'g'
              ),
              '[íìîï]', 'i', 'g'
            ),
            '[óòôõöø]', 'o', 'g'
          ),
          '[úùûü]', 'u', 'g'
        ),
        '[ç]', 'c', 'g'
      ),
      '[^a-z0-9\s-]', '', 'g'
    )
  ) || '-' || id::TEXT;
END;
$$ LANGUAGE plpgsql;

-- 4. Atualizar registros existentes com slug
UPDATE public.paginas_relacionadas 
SET slug = generate_slug(titulo, id) 
WHERE slug IS NULL;

-- 5. Trigger para gerar slug automaticamente em novos registros
CREATE OR REPLACE FUNCTION set_slug_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := generate_slug(NEW.titulo, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Criar trigger
DROP TRIGGER IF EXISTS trigger_set_slug ON public.paginas_relacionadas;
CREATE TRIGGER trigger_set_slug
  BEFORE INSERT ON public.paginas_relacionadas
  FOR EACH ROW
  EXECUTE FUNCTION set_slug_on_insert();

-- 7. Trigger para atualizar slug quando título muda
CREATE OR REPLACE FUNCTION update_slug_on_title_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.titulo != OLD.titulo THEN
    NEW.slug := generate_slug(NEW.titulo, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_slug ON public.paginas_relacionadas;
CREATE TRIGGER trigger_update_slug
  BEFORE UPDATE ON public.paginas_relacionadas
  FOR EACH ROW
  EXECUTE FUNCTION update_slug_on_title_change();

-- 8. Conceder permissões RLS (se necessário)
-- Permite que usuários autenticados vejam todas as páginas
CREATE POLICY "Páginas são visíveis para todos" ON public.paginas_relacionadas
  FOR SELECT USING (true);

-- Permite que membros da equipe criem páginas
CREATE POLICY "Equipe pode criar páginas" ON public.paginas_relacionadas
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE id = auth.uid() 
      AND papel IN ('administrador', 'equipe', 'membro')
    )
  );

-- Permite que autores editem suas próprias páginas ou admins editem qualquer uma
CREATE POLICY "Autores podem editar suas páginas" ON public.paginas_relacionadas
  FOR UPDATE 
  TO authenticated
  USING (
    autor = (SELECT nome FROM public.equipe WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE id = auth.uid() 
      AND papel = 'administrador'
    )
  );

-- Permite que autores excluam suas próprias páginas ou admins excluam qualquer uma
CREATE POLICY "Autores podem excluir suas páginas" ON public.paginas_relacionadas
  FOR DELETE 
  TO authenticated
  USING (
    autor = (SELECT nome FROM public.equipe WHERE id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.equipe 
      WHERE id = auth.uid() 
      AND papel = 'administrador'
    )
  );

-- 9. Habilitar RLS
ALTER TABLE public.paginas_relacionadas ENABLE ROW LEVEL SECURITY;