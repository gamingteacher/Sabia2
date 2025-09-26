import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const EditarPagina = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Editar página existente" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editar Página</h2>
          <button
            onClick={() => navigate('/painel/paginas')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Voltar
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Editor de Páginas
            </h3>
            <p className="text-gray-600 mb-6">
              A funcionalidade de editar páginas será implementada em breve.
            </p>
            <p className="text-sm text-gray-500">
              ID da página: <code className="bg-gray-100 px-2 py-1 rounded">{id}</code>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <FooterNav />
    </div>
    </>
  )
}

export default EditarPagina