import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFerramentasStore } from '../stores'

const HomePage = () => {
  const { ferramentas, loading, error, loadFerramentas } = useFerramentasStore()

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {/* Ícone do pássaro (simplificado) */}
              <div className="w-12 h-12 bg-secondary rounded-full"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">sabIA</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Saberes sobre Inteligência Artificial para Aprendizagem de Línguas
            </p>
          </div>
        </div>
      </section>

      {/* Seções de navegação */}
      <section className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button 
              className="bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              onClick={() => document.getElementById('curadoria')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Entenda a curadoria
            </button>
            <button 
              className="bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conheça as categorias
            </button>
            <button 
              className="bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              onClick={() => document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore as ferramentas
            </button>
            <button className="bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Seja L.I.V.R.E.
            </button>
          </div>
        </div>
      </section>

      {/* Seção Curadoria */}
      <section id="curadoria" className="p-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">O sabIA</h2>
          <p className="text-gray-700 leading-relaxed">
            O sabIA é uma plataforma de curadoria de ferramentas de Inteligência Artificial 
            voltadas para o ensino e aprendizagem de línguas. Nossa missão é facilitar o acesso 
            a recursos de qualidade que podem transformar a experiência educacional.
          </p>
        </div>
      </section>

      {/* Seção Categorias */}
      <section id="categorias" className="p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-primary mb-2">Conversação</h3>
              <p className="text-sm text-gray-600">Ferramentas para prática de diálogo e comunicação oral</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-primary mb-2">Escrita</h3>
              <p className="text-sm text-gray-600">Recursos para aprimorar habilidades de escrita</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-primary mb-2">Gramática</h3>
              <p className="text-sm text-gray-600">Assistentes para correção e ensino gramatical</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Ferramentas */}
      <section id="ferramentas" className="p-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ferramentas</h2>
          
          {ferramentas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhuma ferramenta encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ferramentas.map((ferramenta) => (
                <div key={ferramenta.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {ferramenta.nome}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {ferramenta.funcao}
                  </p>
                  <div className="mb-4">
                    {ferramenta.tags && ferramenta.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {ferramenta.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-secondary/20 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {ferramenta.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                            +{ferramenta.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/ferramenta/${ferramenta.id}`}
                      className="flex-1 bg-primary text-white py-2 px-4 rounded text-center hover:bg-primary/90 transition-colors"
                    >
                      Ver detalhes
                    </Link>
                    {ferramenta.link_site && (
                      <a
                        href={ferramenta.link_site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary text-gray-800 py-2 px-4 rounded hover:bg-secondary/90 transition-colors"
                      >
                        Acessar
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage