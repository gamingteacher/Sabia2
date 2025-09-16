import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useFerramentasStore, usePaginasStore } from '../stores'

const ToolPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ferramentaAtual, loading: loadingFerramenta, error, loadFerramenta } = useFerramentasStore()
  const { paginas, loading: loadingPaginas, loadPaginas } = usePaginasStore()

  useEffect(() => {
    if (id) {
      loadFerramenta(parseInt(id))
      loadPaginas(parseInt(id))
    }
  }, [id, loadFerramenta, loadPaginas])

  if (loadingFerramenta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ferramenta...</p>
        </div>
      </div>
    )
  }

  if (error || !ferramentaAtual) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || 'Ferramenta não encontrada'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header com navegação */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {ferramentaAtual.nome}
            </h1>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Informações da ferramenta */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {ferramentaAtual.nome}
            </h2>
            
            {ferramentaAtual.funcao && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Função</h3>
                <p className="text-gray-600 leading-relaxed">
                  {ferramentaAtual.funcao}
                </p>
              </div>
            )}

            {ferramentaAtual.como_pode_ajudar && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Como pode ajudar</h3>
                <p className="text-gray-600 leading-relaxed">
                  {ferramentaAtual.como_pode_ajudar}
                </p>
              </div>
            )}

            {ferramentaAtual.tags && ferramentaAtual.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {ferramentaAtual.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary/20 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ferramentaAtual.link_site && (
              <div className="pt-4 border-t">
                <a
                  href={ferramentaAtual.link_site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <span>Acessar ferramenta</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Páginas relacionadas */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Páginas relacionadas</h3>
          
          {loadingPaginas ? (
            <div className="text-center py-8">
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando páginas...</p>
            </div>
          ) : paginas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhuma página relacionada encontrada.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginas.map((pagina) => (
                <div key={pagina.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {pagina.titulo}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Por: {pagina.autor}
                  </p>
                  {pagina.conteudo && (
                    <p className="text-gray-700 line-clamp-3">
                      {pagina.conteudo}
                    </p>
                  )}
                  <div className="mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(pagina.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default ToolPage