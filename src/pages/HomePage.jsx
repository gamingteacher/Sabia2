import React, { useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { Info, CheckCircle, Archive, BookOpen, Users } from 'lucide-react'
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
    <div className="min-h-screen">
      {/* Hero Section */}
        <section className="text-white py-16">
          <div className="max-w-3xl mx-auto px-2 bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-6">
          {/* Ícone do pássaro (simplificado) */}
            <div className="flex-shrink-0">
              <img className="h-40" src="/logobig.png" alt="Logo Sabia" />
            </div>
          <div className="text-left">
            <h1 className="text-primary text-4xl md:text-5xl font-bold mb-4">sabIA</h1>
            <p className="text-primary text-xl md:text-2xl opacity-90">
              Saberes sobre Inteligência Artificial para Aprendizagem de Línguas
            </p>
             </div>
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
                  <Info className="w-4 h-4 text-primary" />
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
                  <CheckCircle className="w-4 h-4 text-primary" />
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
                  <Archive className="w-4 h-4 text-primary" />
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
                  <BookOpen className="w-4 h-4 text-primary" />
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
                  <Users className="w-4 h-4 text-primary" />
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
        <div className="mx-auto flex items-center justify-center p-8">
          <Link
            to="/ferramentas"
            className="inline-flex items-center gap-2 bg-primary text-white text-2xl font-bold p-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explorar Ferramentas
          </Link>
        </div>
        <div className="mx-auto flex items-center justify-center p-8"> SabIA  v.2.0 beta</div>

    </div>
  )
}

export default HomePage