import React, { useEffect, useState, useMemo } from 'react'
import { ExternalLink, Search, Filter } from 'lucide-react'
import { useFerramentasStore } from '../stores'

const ToolPage = () => {
  const { ferramentas, loading, error, loadFerramentas } = useFerramentasStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  // Filtrar ferramentas baseado na busca e tag selecionada
  const filteredFerramentas = useMemo(() => {
    return ferramentas.filter(ferramenta => {
      const matchesSearch = ferramenta.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (ferramenta.funcao && ferramenta.funcao.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (ferramenta.como_pode_ajudar && ferramenta.como_pode_ajudar.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesTag = !selectedTag || (ferramenta.tags && ferramenta.tags.includes(selectedTag))
      
      return matchesSearch && matchesTag
    })
  }, [ferramentas, searchTerm, selectedTag])

  // Obter todas as tags únicas
  const allTags = useMemo(() => {
    const tags = new Set()
    ferramentas.forEach(ferramenta => {
      if (ferramenta.tags && Array.isArray(ferramenta.tags)) {
        ferramenta.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [ferramentas])

  // Função para obter favicon de um site
  const getFaviconUrl = (url) => {
    if (!url) return null
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ferramentas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erro ao carregar ferramentas: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="flex text-primary max-w-4xl mx-auto px-8 justify-between">
          {/* Ícone do pássaro (simplificado) */}
            <div className="flex items-center">
              <img className="w-40 h-40" src="/logobig.png" alt="Logo Sabia" />
              <div className="text-left">
                <h1 className="text-3xl font-bold mb-2">Ferramentas de IA</h1>
                <p className="text-primary-100">
                  Explore nossa curadoria de ferramentas de inteligência artificial para ensino de línguas
                </p>
              </div>
            </div>
                </header>

                {/* Filtros */}
                <section className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Barra de busca */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
              type="text"
              placeholder="Buscar ferramentas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Filtro por tags */}
            <div className="sm:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white"
              >
                <option value="">Todas as tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredFerramentas.length} ferramenta{filteredFerramentas.length !== 1 ? 's' : ''} encontrada{filteredFerramentas.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Grid de Cards */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredFerramentas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {ferramentas.length === 0 
                ? 'Nenhuma ferramenta disponível no momento.' 
                : 'Nenhuma ferramenta encontrada com os filtros aplicados.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFerramentas.map((ferramenta) => (
              <div key={ferramenta.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {/* Header do card */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 flex-1 mr-3">
                      {ferramenta.nome}
                    </h3>
                    {ferramenta.link_site && (
                      <div className="flex items-center gap-2">
                        {getFaviconUrl(ferramenta.link_site) && (
                          <img 
                            src={getFaviconUrl(ferramenta.link_site)} 
                            alt=""
                            className="w-8 h-8"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        )}
                        <a
                          href={ferramenta.link_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Acessar ferramenta"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-4">
                  {/* Função e Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Função</h4>
                      <p className="text-sm text-gray-600">
                        {ferramenta.funcao || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {ferramenta.tags && ferramenta.tags.length > 0 ? (
                          ferramenta.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs bg-secondary/20 text-primary rounded-full"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">Sem tags</span>
                        )}
                        {ferramenta.tags && ferramenta.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{ferramenta.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Como pode ajudar */}
                  {ferramenta.como_pode_ajudar && (
                    <div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {ferramenta.como_pode_ajudar}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer do card com link */}
                {ferramenta.link_site && (
                  <div className="px-4 pb-4">
                    <a
                      href={ferramenta.link_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Acessar Ferramenta
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ToolPage