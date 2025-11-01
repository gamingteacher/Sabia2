import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Store de autenticação
import { useAuthStore } from './stores'

// Layouts e componentes
import Layout from './components/Layout'

// Páginas principais
import HomePage from './pages/HomePage'
import ToolPage from './pages/ToolPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'

// Componente de proteção
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

// Páginas estáticas
import SobrePage from './pages/SobrePage'
import CuradoriaPage from './pages/CuradoriaPage'
import CategoriasPage from './pages/CategoriasPage'
import ModeloLivrePage from './pages/ModeloLivrePage'
import CreditosPage from './pages/CreditosPage'

// Páginas administrativas
import CriarFerramenta from './pages/admin/CriarFerramenta'
import EditarFerramenta from './pages/admin/EditarFerramenta'
import ListarFerramentas from './pages/admin/ListarFerramentas'
import ListarPaginas from './pages/admin/ListarPaginas'
import CriarPagina from './pages/admin/CriarPagina'
import EditarPagina from './pages/admin/EditarPagina'
import GerenciarSolicitacoes from './pages/admin/GerenciarSolicitacoes'
import GerenciarEquipe from './pages/admin/GerenciarEquipe'

// Importar CSS do Tailwind
import './index.css'

function App() {
  const { initAuth } = useAuthStore()

  // Inicializar autenticação quando o app carrega
  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ferramentas" element={<ToolPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="post/:slug" element={<PostPage />} />
          <Route path="ferramenta/:id" element={<ToolPage />} />
          
          {/* Páginas estáticas */}
          <Route path="sobre" element={<SobrePage />} />
          <Route path="curadoria" element={<CuradoriaPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="modelo-livre" element={<ModeloLivrePage />} />
          <Route path="creditos" element={<CreditosPage />} />
        </Route>

        {/* Rotas protegidas - Painel Administrativo */}
        <Route path="/painel" element={<ProtectedAdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ferramentas" element={<ListarFerramentas />} />
          <Route path="ferramentas/criar" element={<CriarFerramenta />} />
          <Route path="ferramentas/editar/:id" element={<EditarFerramenta />} />
          <Route path="paginas" element={<ListarPaginas />} />
          <Route path="paginas/criar" element={<CriarPagina />} />
          <Route path="paginas/editar/:id" element={<EditarPagina />} />
          <Route path="solicitacoes" element={<GerenciarSolicitacoes />} />
          <Route path="equipe" element={<GerenciarEquipe />} />
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App