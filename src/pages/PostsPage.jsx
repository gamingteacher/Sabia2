import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Search, Filter, ExternalLink } from 'lucide-react'
import { usePaginasStore, useFerramentasStore } from '../stores'

const PostsPage = () => {
  const { paginas, loading, error, loadPaginas } = usePaginasStore()
  const { ferramentas, loadFerramentas } = useFerramentasStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedFerramenta, setSelectedFerramenta] = useState('')

  useEffect(() => {
    loadPaginas()
    loadFerramentas()
  }, [loadPaginas, loadFerramentas])

  // Filtrar páginas
  const filteredPaginas = useMemo(() => {
    return paginas.filter(pagina => {
      const matchesSearch = pagina.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pagina.autor.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDate = !selectedDate || 
                         new Date(pagina.created_at).toISOString().split('T')[0] === selectedDate
      
      const matchesFerramenta = !selectedFerramenta || 
                               pagina.ferramenta_id?.toString() === selectedFerramenta

      return matchesSearch && matchesDate && matchesFerramenta
    })
  }, [paginas, searchTerm, selectedDate, selectedFerramenta])

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erro ao carregar posts: {error}</p>
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
            <h1 className="text-3xl font-bold mb-2">Posts e Artigos</h1>
            <p className="text-primary-100">
              Artigos e conteúdos sobre ferramentas de IA para ensino de línguas
            </p>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <section className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barra de busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por título ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Filtro por data */}
            <div className="lg:w-48">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Filtro por ferramenta */}
            <div className="lg:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedFerramenta}
                onChange={(e) => setSelectedFerramenta(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white"
              >
                <option value="">Todas as ferramentas</option>
                {ferramentas.map(ferramenta => (
                  <option key={ferramenta.id} value={ferramenta.id}>
                    {ferramenta.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredPaginas.length} post{filteredPaginas.length !== 1 ? 's' : ''} encontrado{filteredPaginas.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Grid de Cards */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredPaginas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {paginas.length === 0 
                ? 'Nenhum post disponível no momento.' 
                : 'Nenhum post encontrado com os filtros aplicados.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaginas.map((pagina) => (
              <div key={pagina.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {/* Header do card */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 flex-1 mr-3 line-clamp-2">
                      {pagina.titulo}
                    </h3>
                    {pagina.ferramentas && (
                      <div className="flex items-center gap-2">
                        <Link
                          to="/ferramentas"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Ver ferramenta relacionada"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-4">
                  {/* Data e Autor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Data</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(pagina.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Autor</h4>
                      <p className="text-sm text-gray-600">
                        {pagina.autor || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  {/* Ferramenta relacionada */}
                  {pagina.ferramentas && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Ferramenta Relacionada</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 text-xs bg-secondary/20 text-primary rounded-full">
                          {pagina.ferramentas.nome}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer do card com link */}
                <div className="px-4 pb-4">
                  <Link
                    to={`/post/${generateSlug(pagina.titulo)}-${pagina.id}`}
                    className="block w-full text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Ler Post
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default PostsPage