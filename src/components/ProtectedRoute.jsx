import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isUserAdmin, loading } = useAuthStore()

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Verificar se está autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // Verificar se precisa ser admin
  if (requireAdmin && !isUserAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute