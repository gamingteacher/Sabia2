import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const ListarPaginas = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Gerencie páginas e conteúdo da plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciar Páginas</h2>
          <Link
            to="/painel/paginas/criar"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Página
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Gerenciamento de Páginas
            </h3>
            <p className="text-gray-600 mb-6">
              O sistema de gerenciamento de páginas será implementado em breve. 
              Aqui você poderá criar, editar e organizar o conteúdo da plataforma.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Criar páginas personalizadas</p>
              <p>• Editor de conteúdo rich text</p>
              <p>• Organização e categorização</p>
              <p>• Controle de publicação</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <FooterNav />
    </div>
    </>
  )
}

export default ListarPaginas