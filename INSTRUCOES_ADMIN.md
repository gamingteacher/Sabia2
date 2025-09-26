# Configuração Completa do Sistema de Administração

## 1. Executar SQL no Supabase

Copie e execute o arquivo `supabase-admin-functions.sql` no editor SQL do Supabase. Este arquivo irá:

- **Criar/atualizar a tabela `equipe`** com todas as colunas necessárias
- **Inserir o admin inicial** (krlloz@live.com) automaticamente
- **Criar todas as funções RPC** para gerenciamento

## 2. Verificar Tabela Equipe

Após executar o SQL, verifique se a tabela foi criada corretamente:

```sql
-- Verificar estrutura da tabela
\d public.equipe;

-- Verificar se o admin foi inserido
SELECT * FROM public.equipe WHERE email = 'krlloz@live.com';
```

A tabela deve ter as colunas:
- `id` (UUID, chave primária)
- `nome` (TEXT)
- `email` (TEXT, único)
- `instituicao` (TEXT)
- `papel` (VARCHAR(20), padrão: 'membro')
- `is_admin` (BOOLEAN, padrão: false)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

## 3. Criar Conta de Autenticação do Admin

No painel do Supabase, vá em Authentication > Users e:

1. Clique em "Add user"
2. Digite o email do admin
3. Digite uma senha temporária
4. Marque "Auto Confirm User"
5. Clique em "Add user"

**OU** use o SQL Editor:

```sql
-- Isso só funciona se você tiver as permissões adequadas
SELECT auth.admin_create_user(
  'admin@email.com',
  'senha_temporaria_123',
  true  -- email_confirm
);
```

## 4. Fluxo de Funcionamento

### Para Login do Admin:
1. Admin acessa `/login`
2. Faz login com email/senha
3. Sistema verifica se é admin na tabela `equipe`
4. Redireciona para `/admin`

### Para Aprovação de Usuários:
1. Admin vai em "Solicitações" no painel
2. Clica em "Aprovar" numa solicitação
3. Sistema chama `aprovar_criar_usuario` que:
   - Adiciona usuário à tabela `equipe`
   - Marca solicitação como aprovada
   - Tenta criar conta auth automaticamente
   - Se falhar na criação auth, mostra instruções manuais

### Para Gerenciar Equipe:
1. Admin vai em "Equipe" no painel
2. Pode promover membros a admin
3. Pode remover usuários da equipe
4. Vê informações de todos os membros

## 5. Limitações e Soluções

### Criação Automática de Usuários Auth:
A criação automática via `supabase.auth.admin.createUser()` pode não funcionar no frontend por limitações de permissões. Se isso acontecer:

**Solução Manual:**
1. Quando aprovar um usuário, anote o email e senha
2. Vá no painel Supabase > Authentication > Users
3. Clique "Add user" e crie manualmente
4. Use a senha que estava na solicitação

**Solução via Backend (recomendada):**
Crie uma Edge Function no Supabase que tenha permissões admin para criar usuários.

## 6. Verificações de Segurança

- Todas as funções RPC verificam se quem está executando é admin
- Admin não pode remover a própria conta
- Verificação de admin funciona tanto por ID quanto por email
- Senhas são hasheadas pelo Supabase Auth

## 7. Próximos Passos (Opcionais)

1. **Notificações por Email**: Configurar envio de email quando usuário é aprovado
2. **Logs de Auditoria**: Registrar todas as ações administrativas
3. **Roles Granulares**: Criar diferentes níveis de permissão além de admin/membro
4. **Bulk Actions**: Permitir aprovação/rejeição em lote de solicitações

## 8. Troubleshooting

### Se o admin não consegue logar:
- Verifique se a conta existe em Auth > Users
- Verifique se `is_admin = true` na tabela equipe
- Verifique se o email está correto em ambas as tabelas

### Se aprovação não funciona:
- Verifique se as funções RPC foram criadas corretamente
- Verifique se o admin tem `is_admin = true`
- Veja os logs no console do navegador

### Se usuário aprovado não consegue logar:
- Vá em Auth > Users e crie a conta manualmente
- Use a senha que estava na solicitação original
- Marque "Auto Confirm User" ao criar