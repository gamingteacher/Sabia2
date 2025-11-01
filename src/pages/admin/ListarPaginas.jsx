import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, ExternalLink, Calendar, Search } from 'lucide-react'
import { usePaginasStore } from '../../stores'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const ListarPaginas = () => {
  const { paginas, loading, error, loadPaginas, deletePagina } = usePaginasStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPaginas()
  }, [loadPaginas])

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`Tem certeza que deseja excluir a página "${titulo}"?`)) {
      const result = await deletePagina(id)
      if (!result.success) {
        alert('Erro ao excluir página: ' + result.error)
      }
    }
  }

  // Filtrar páginas
  const filteredPaginas = paginas.filter(pagina =>
    pagina.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pagina.autor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Função para gerar slug
  const generateSlug = (titulo) => {
    return titulo
      .toLowerCase()
      .replace(/[áàâãä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando páginas...</p>
        </div>
      </div>
    )
  }

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

        {/* Barra de busca */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar páginas por título ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {filteredPaginas.length} página{filteredPaginas.length !== 1 ? 's' : ''} encontrada{filteredPaginas.length !== 1 ? 's' : ''}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            Erro ao carregar páginas: {error}
          </div>
        )}

        {filteredPaginas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {paginas.length === 0 ? 'Nenhuma página criada' : 'Nenhuma página encontrada'}
              </h3>
              <p className="text-gray-600 mb-6">
                {paginas.length === 0 
                  ? 'Comece criando sua primeira página com conteúdo rico em Markdown.'
                  : 'Tente ajustar os filtros de busca para encontrar o que procura.'
                }
              </p>
              {paginas.length === 0 && (
                <Link
                  to="/painel/paginas/criar"
                  className="inline-flex items-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Criar Primeira Página
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaginas.map((pagina) => (
              <div key={pagina.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {/* Header do card */}
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {pagina.titulo}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(pagina.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Por: <span className="font-medium">{pagina.autor}</span>
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-4">
                  {pagina.ferramentas && (
                    <div className="mb-3 flex items-center text-sm text-primary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="font-medium">{pagina.ferramentas.nome}</span>
                    </div>
                  )}
                  
                  {pagina.conteudo && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {pagina.conteudo.replace(/[#*`>-]/g, '').substring(0, 120)}...
                    </p>
                  )}
                </div>

                {/* Footer com ações */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/post/${generateSlug(pagina.titulo)}-${pagina.id}`}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver página
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/painel/paginas/editar/${pagina.id}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(pagina.id, pagina.titulo)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer Navigation */}
      <FooterNav />
    </div>
    </>
  )
}

export default ListarPaginas