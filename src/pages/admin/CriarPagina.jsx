import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const CriarPagina = () => {
  const navigate = useNavigate()

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Criar nova página para a plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Criar Nova Página</h2>
          <button
            onClick={() => navigate('/painel/paginas')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Voltar
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✏️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Editor de Páginas
            </h3>
            <p className="text-gray-600 mb-6">
              O editor de páginas será implementado em breve. 
              Aqui você poderá criar conteúdo rico para a plataforma.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Editor visual WYSIWYG</p>
              <p>• Inserção de imagens e mídia</p>
              <p>• Formatação avançada</p>
              <p>• Preview em tempo real</p>
              <p>• SEO e meta tags</p>
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

export default CriarPagina