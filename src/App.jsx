import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores'

// Layouts e componentes
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Páginas principais
import HomePage from './pages/HomePage'
import ToolPage from './pages/ToolPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'

// Páginas administrativas
import CriarFerramenta from './pages/admin/CriarFerramenta'
import ListarFerramentas from './pages/admin/ListarFerramentas'

// Importar CSS do Tailwind
import './index.css'

function App() {
  const { initAuth } = useAuthStore()

  // Inicializar autenticação ao carregar a aplicação
  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ferramenta/:id" element={<ToolPage />} />
        </Route>

        {/* Página de login (sem layout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas administrativas protegidas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Sub-rotas do admin */}
          <Route path="ferramentas" element={<ListarFerramentas />} />
          <Route path="ferramentas/criar" element={<CriarFerramenta />} />
          <Route path="ferramentas/editar/:id" element={<div>Editar Ferramenta (em desenvolvimento)</div>} />
          <Route path="paginas" element={<div>Listar Páginas (em desenvolvimento)</div>} />
          <Route path="paginas/criar" element={<div>Criar Página (em desenvolvimento)</div>} />
          <Route path="paginas/editar/:id" element={<div>Editar Página (em desenvolvimento)</div>} />
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App