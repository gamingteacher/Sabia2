import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminHeader = ({ title, subtitle, solicitacoesPendentes = 0 }) => {
  const location = useLocation()

  return (
    <>
      {/* Header Admin */}
      <header className="bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Painel SabIA</h1>
              <p className="text-sm text-primary-100">
                {subtitle || "Gerencie ferramentas, páginas e solicitações"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação admin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <nav className="flex overflow-x-auto">
            <Link 
              to="/painel/ferramentas" 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                location.pathname.includes('/painel/ferramentas') ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              Ferramentas
            </Link>
            <Link 
              to="/painel/paginas" 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                location.pathname.includes('/painel/paginas') ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              Páginas
            </Link>
            <Link 
              to="/painel/solicitacoes" 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                location.pathname === '/painel/solicitacoes' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              Solicitações {solicitacoesPendentes > 0 && <span className="ml-1 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded-full">{solicitacoesPendentes}</span>}
            </Link>
            <Link 
              to="/painel/equipe" 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                location.pathname === '/painel/equipe' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              Equipe
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default AdminHeader