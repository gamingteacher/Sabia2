import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFerramentasStore } from '../stores'

const HomePage = () => {
  const { ferramentas, loading, error, loadFerramentas } = useFerramentasStore()
  const navigate = useNavigate()

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
        <div className="max-w-6xl mx-auto px-2">
          <div className="text-center">
            <div className="w-flex h-40 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              {/* Ícone do pássaro (simplificado) */}
              <img className="h-40" src="/src/assets/logobig.png" alt="Logo Sabia" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">sabIA</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Saberes sobre Inteligência Artificial para Aprendizagem de Línguas
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Páginas Informativas */}
      <section className="p-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Conheça o sabIA</h2>
          
          {/* Grid de 2 colunas sem scrollbar - mais compacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div 
              onClick={() => navigate('/sobre')}
              className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all cursor-pointer border-l-4 border-primary group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors">Sobre O SabIA</h3>
              </div>
              <p className="text-xs text-gray-600 ml-11">
                Conheça nossa plataforma de curadoria e exploração de ferramentas de IA para ensino de línguas.
              </p>
            </div>

            <div 
              onClick={() => navigate('/curadoria')}
              className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all cursor-pointer border-l-4 border-primary group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/30 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors">Como Funciona a Curadoria</h3>
              </div>
              <p className="text-xs text-gray-600 ml-11">
                Entenda nosso processo de seleção e análise das ferramentas de inteligência artificial.
              </p>
            </div>

            <div 
              onClick={() => navigate('/categorias')}
              className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all cursor-pointer border-l-4 border-primary group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors">Conheça as Categorias</h3>
              </div>
              <p className="text-xs text-gray-600 ml-11">
                Explore nossa organização linguístico-pedagógica das ferramentas disponíveis.
              </p>
            </div>

            <div 
              onClick={() => navigate('/modelo-livre')}
              className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all cursor-pointer border-l-4 border-primary group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/30 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors">Modelo L.I.V.R.E.</h3>
              </div>
              <p className="text-xs text-gray-600 ml-11">
                Descubra nosso framework para análise crítica de ferramentas de IA na aprendizagem de línguas.
              </p>
            </div>

            <div 
              onClick={() => navigate('/creditos')}
              className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all cursor-pointer border-l-4 border-primary group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors">Créditos e Licença</h3>
              </div>
              <p className="text-xs text-gray-600 ml-11">
                Conheça nossa equipe, licenças de uso e informações de contato do projeto.
              </p>
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