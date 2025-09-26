import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { supabase } from '../services/supabase'
import AdminHeader from '../components/AdminHeader'
import FooterNav from '../components/FooterNav'

const AdminDashboard = () => {
  const location = useLocation()
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState(0)

  useEffect(() => {
    if (location.pathname === '/painel') {
      loadSolicitacoesPendentes()
    }
  }, [location.pathname])

  const loadSolicitacoesPendentes = async () => {
    try {
      const { count, error } = await supabase
        .from('solicitacoes_acesso')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pendente')

      if (!error) {
        setSolicitacoesPendentes(count || 0)
      }
    } catch (error) {
      console.error('Erro ao carregar solicitações pendentes:', error)
    }
  }

  // Determinar se estamos na dashboard principal ou em uma sub-página
  const isDashboardPage = location.pathname === '/painel'

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader solicitacoesPendentes={solicitacoesPendentes} />
      
        {/* Conteúdo da página atual */}
        {isDashboardPage ? (
          <div className="space-y-6 pb-24">
            {/* Estatísticas Rápidas */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Visão Geral</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Ferramentas</h3>
                  <p className="text-3xl font-bold text-primary">--</p>
                  <p className="text-sm text-gray-500">Total cadastradas</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Páginas</h3>
                  <p className="text-3xl font-bold text-secondary">--</p>
                  <p className="text-sm text-gray-500">Páginas relacionadas</p>
                </div>
                <Link 
                  to="/painel/solicitacoes"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Solicitações</h3>
                  <p className="text-3xl font-bold text-orange-600">{solicitacoesPendentes}</p>
                  <p className="text-sm text-gray-500">Pendentes aprovação</p>
                </Link>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Atividade</h3>
                  <p className="text-3xl font-bold text-green-600">--</p>
                  <p className="text-sm text-gray-500">Ações recentes</p>
                </div>
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/painel/ferramentas/criar"
                  className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Nova Ferramenta</h4>
                    <p className="text-sm text-gray-600">Adicionar nova ferramenta IA</p>
                  </div>
                </Link>
                
                <Link
                  to="/painel/paginas/criar"
                  className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Nova Página</h4>
                    <p className="text-sm text-gray-600">Criar página relacionada</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
        
        {/* Footer Navigation */}
        <FooterNav />
    </div>
  )
}

export default AdminDashboard