import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores'

const ProtectedAdminRoute = () => {
  const { isAuthenticated, hasToolAccess, isLoading } = useAuthStore()

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Se não está autenticado, redirecionar para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se não tem acesso, mostrar mensagem
  if (!hasToolAccess()) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
            <div className="text-yellow-600 text-5xl mb-4">⏳</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aguardando Aprovação
            </h2>
            <p className="text-gray-600 mb-4">
              Sua conta está pendente de aprovação pela equipe.
            </p>
          </div>
          <a
            href="/"
            className="inline-block mt-4 text-primary hover:text-primary/80 transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    )
  }

  // Se passou nas verificações, renderizar as sub-rotas
  return <Outlet />
}

export default ProtectedAdminRoute