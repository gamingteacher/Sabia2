# sabIA - Saberes sobre Inteligência Artificial para Aprendizagem de Línguas

> **"Inspirado no canto curioso do sabiá, valorizando a descoberta, a diversidade e o cuidado com o conhecimento compartilhado."**

O sabIA é uma plataforma de curadoria e exploração de ferramentas de inteligência artificial aplicadas ao ensino e aprendizagem de línguas. Pensado como um espaço acessível, educativo e colaborativo, permite que estudantes, educadores e curiosos descubram recursos tecnológicos úteis para práticas linguísticas, com foco em leitura, escrita, fala, escuta, vocabulário, planejamento textual, tradução, entre outros aspectos.

## 🎯 Funcionalidades Principais

### Para Usuários Gerais
- 🔍 **Exploração de Ferramentas**: Catálogo público de ferramentas de IA curadas
- 🏷️ **Sistema de Tags**: Filtros por categorias e funcionalidades
- 🔗 **Acesso Direto**: Links para as ferramentas com favicons automáticos  
- 📱 **Interface Responsiva**: Experiência otimizada para todos os dispositivos
- 📚 **Páginas Informativas**: Sobre o projeto, curadoria, categorias e modelo L.I.V.R.E.

### Para Administradores
- 🔐 **Autenticação Segura**: Sistema de login com controle de permissões
- ⚡ **Edição Inline**: Interface de tabela para gerenciamento rápido de ferramentas
- 👥 **Gestão de Equipe**: Controle de usuários e permissões administrativas
- 📊 **Painel Administrativo**: Dashboard completo para gestão de conteúdo
- 🔄 **Operações CRUD**: Criar, editar e excluir ferramentas em tempo real

## 🚀 Tecnologias

- **Frontend**: React 18 com Vite
- **Roteamento**: React Router DOM v6
- **Estilização**: Tailwind CSS v3
- **Ícones**: Lucide React
- **Estado Global**: Zustand
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **PWA**: Vite PWA Plugin

## 🎨 Esquema de Cores

- **Primary**: `#d2691e` (Laranja principal)
- **Secondary**: `#fed303` (Amarelo de destaque)
- **Background**: `#f8e8dd` (Fundo bege claro)
- **Text Dark**: `#ffffff` (Texto escuro)
- **Text Light**: `#fcf7f3` (Texto claro)

## 📁 Estrutura do Projeto

```
sabia2/
├── public/                  # Assets estáticos
│   ├── logobig.png         # Logo principal da aplicação
│   ├── favicon.ico         # Ícone do navegador
│   └── pwa-*.png           # Ícones PWA
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── FooterNav.jsx   # Navegação inferior fixa
│   │   ├── Layout.jsx      # Layout principal com outlet
│   │   ├── AdminHeader.jsx # Cabeçalho das páginas admin
│   │   └── ProtectedAdminRoute.jsx # Proteção de rotas admin
│   ├── pages/              # Páginas da aplicação
│   │   ├── HomePage.jsx    # Página inicial com links informativos
│   │   ├── ToolPage.jsx    # Catálogo público de ferramentas
│   │   ├── LoginPage.jsx   # Autenticação administrativa
│   │   ├── AdminDashboard.jsx # Dashboard administrativo
│   │   ├── SobrePage.jsx   # Sobre o projeto
│   │   ├── CuradoriaPage.jsx # Processo de curadoria
│   │   ├── CategoriasPage.jsx # Organização das categorias
│   │   ├── ModeloLivrePage.jsx # Framework L.I.V.R.E.
│   │   ├── CreditosPage.jsx # Equipe e licenças
│   │   └── admin/          # Páginas administrativas
│   │       ├── ListarFerramentas.jsx # Gestão inline de ferramentas
│   │       ├── CriarFerramenta.jsx   # Formulário de criação
│   │       ├── EditarFerramenta.jsx  # Formulário de edição
│   │       ├── GerenciarEquipe.jsx   # Gestão de usuários
│   │       ├── GerenciarSolicitacoes.jsx # Solicitações pendentes
│   │       ├── ListarPaginas.jsx     # Gestão de páginas
│   │       ├── CriarPagina.jsx       # Criação de páginas
│   │       └── EditarPagina.jsx      # Edição de páginas
│   ├── services/           # Integrações externas
│   │   └── supabase.js     # Cliente e configuração Supabase
│   ├── stores/             # Gerenciamento de estado
│   │   ├── index.js        # Store principal (ferramentas, páginas)
│   │   └── authSimple.js   # Store de autenticação
│   ├── App.jsx             # Roteamento principal
│   ├── main.jsx            # Entry point da aplicação
│   └── index.css           # Estilos globais Tailwind
├── utils/                  # Utilitários e helpers
├── .env.example            # Variáveis de ambiente modelo
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração Tailwind
├── vite.config.js          # Configuração Vite + PWA
└── README.md               # Documentação do projeto
```

## 🗄️ Banco de Dados (Supabase)

### Esquema das Tabelas

#### `equipe`
```sql
CREATE TABLE equipe (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  nome TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

#### `ferramentas`
```sql
CREATE TABLE ferramentas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  link_site TEXT,
  funcao TEXT,
  como_pode_ajudar TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

#### `paginas_relacionadas`
```sql
CREATE TABLE paginas_relacionadas (
  id SERIAL PRIMARY KEY,
  autor TEXT NOT NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT,
  ferramenta_id INTEGER REFERENCES ferramentas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

### Segurança (RLS)
- **Row Level Security** habilitado em todas as tabelas
- **Políticas de acesso** configuradas para operações CRUD
- **Stored procedures** para operações administrativas seguras

## 🛠️ Configuração

### 1. Instalação

```bash
npm install
```

### 2. Configuração do Supabase

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

### 4. Build para produção

```bash
npm run build
```

## 🔐 Autenticação

- Apenas usuários cadastrados na tabela `equipe` podem fazer login
- Usuários com `is_admin = true` têm acesso ao painel administrativo
- Autenticação persistente com Zustand

## 🧭 Rotas

### Públicas
- `/` - Página inicial com links informativos
- `/ferramentas` - Catálogo público de ferramentas de IA
- `/sobre` - Informações sobre o projeto sabIA
- `/curadoria` - Processo de curadoria das ferramentas
- `/categorias` - Organização linguístico-pedagógica
- `/modelo-livre` - Framework de análise crítica
- `/creditos` - Equipe, licenças e contatos
- `/login` - Autenticação administrativa

### Administrativas (protegidas)
- `/painel` - Dashboard administrativo
- `/painel/ferramentas` - Gestão inline de ferramentas
- `/painel/ferramentas/criar` - Criar nova ferramenta
- `/painel/ferramentas/editar/:id` - Editar ferramenta
- `/painel/equipe` - Gerenciar usuários e permissões
- `/painel/solicitacoes` - Solicitações pendentes
- `/painel/paginas` - Gestão de páginas relacionadas
- `/painel/paginas/criar` - Criar página
- `/painel/paginas/editar/:id` - Editar página

## 📱 PWA

A aplicação é configurada como Progressive Web App com:
- Service Worker automático
- Manifest para instalação
- Cache de recursos
- Funciona offline (limitado)

## ✨ Status das Funcionalidades

### Interface Pública
- ✅ **Catálogo de Ferramentas**: Visualização em cards com busca e filtros
- ✅ **Páginas Informativas**: Sobre, Curadoria, Categorias, Modelo L.I.V.R.E., Créditos
- ✅ **Navegação Intuitiva**: Footer fixo com acesso rápido
- ✅ **Design Responsivo**: Otimizado para mobile, tablet e desktop
- ✅ **PWA**: Instalável como aplicativo nativo

### Painel Administrativo
- ✅ **Autenticação Segura**: Login com controle de permissões
- ✅ **Gestão Inline**: Edição direta na tabela de ferramentas
- ✅ **CRUD Completo**: Criar, editar, excluir ferramentas
- ✅ **Gestão de Equipe**: Adicionar/remover usuários administrativos  
- ✅ **Interface Administrativa**: Dashboard com navegação otimizada
- ✅ **Validação de Dados**: Formulários com validação em tempo real

### Recursos Técnicos
- ✅ **Estado Global**: Zustand para gerenciamento de estado
- ✅ **Banco de Dados**: Supabase com RLS e stored procedures
- ✅ **Roteamento Protegido**: Controle de acesso às áreas administrativas
- ✅ **Favicons Automáticos**: Carregamento de ícones dos sites das ferramentas

## 🤝 Contribuição

1. Clone o repositório
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## � Deploy

### Vercel (Recomendado)
1. Faça fork do repositório
2. Conecte seu repositório ao Vercel
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático a cada push

### Build Local
```bash
npm run build
npm run preview
```

## 🔗 Links Úteis

- **Demo Live**: [sabia2.vercel.app](https://sabia2.vercel.app) _(se disponível)_
- **Repositório**: [github.com/gamingteacher/Sabia2](https://github.com/gamingteacher/Sabia2)
- **Supabase**: [supabase.com](https://supabase.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Vite**: [vitejs.dev](https://vitejs.dev)

## 📄 Licença

Este projeto está licenciado sob a **GNU General Public License v3.0 (GPL-3.0)**.

### O que isso significa?

- ✅ **Liberdade de uso**: Você pode usar este software para qualquer propósito
- ✅ **Liberdade de modificar**: Você pode estudar e modificar o código
- ✅ **Liberdade de distribuir**: Você pode distribuir cópias do software
- ✅ **Liberdade de melhorar**: Você pode distribuir versões modificadas

### Condições da GPL-3.0:

- 📋 **Copyleft**: Trabalhos derivados devem ser licenciados sob GPL-3.0
- 📝 **Código fonte**: Deve ser disponibilizado quando distribuído
- 🏷️ **Aviso de licença**: Deve incluir aviso de copyright e licença
- 📄 **Mudanças documentadas**: Modificações devem ser documentadas

### Links da Licença:
- **Texto completo**: [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.html)
- **Resumo legível**: [TL;DR Legal - GPL-3.0](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3))
- **Compatibilidade**: [GPL-Compatible Licenses](https://www.gnu.org/licenses/license-list.html#GPLCompatibleLicenses)

Para mais detalhes, consulte o arquivo [LICENSE](LICENSE) na raiz do projeto.
