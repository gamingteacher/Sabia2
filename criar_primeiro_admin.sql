-- Soluções para criar o primeiro administrador
-- Execute no painel SQL do Supabase

-- OPÇÃO 1: Promover usuário existente manualmente
-- (Substitua pelo email do usuário que deve ser admin)
UPDATE public.equipe 
SET papel = 'administrador', updated_at = NOW()
WHERE email = 'SEU_EMAIL_AQUI@exemplo.com';

-- OPÇÃO 2: Inserir administrador diretamente (se não existe)
INSERT INTO public.equipe (nome, email, instituicao, papel)
VALUES ('Administrador Principal', 'admin@seusite.com', 'Sua Instituição', 'administrador')
ON CONFLICT (email) DO UPDATE SET
    papel = 'administrador',
    updated_at = NOW()
RETURNING *;

-- OPÇÃO 3: Criar função para auto-promoção do primeiro usuário
CREATE OR REPLACE FUNCTION public.promote_first_admin()
RETURNS VOID AS $$
BEGIN
    -- Se não há nenhum administrador, promover o primeiro usuário criado
    IF NOT EXISTS (SELECT 1 FROM public.equipe WHERE papel = 'administrador') THEN
        UPDATE public.equipe 
        SET papel = 'administrador', updated_at = NOW()
        WHERE id = (
            SELECT id FROM public.equipe 
            ORDER BY created_at ASC 
            LIMIT 1
        );
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Executar a função (promove o primeiro usuário se não há admin)
SELECT public.promote_first_admin();

-- VERIFICAR: Listar todos os usuários e seus papéis
SELECT nome, email, papel, created_at 
FROM public.equipe 
ORDER BY created_at ASC;