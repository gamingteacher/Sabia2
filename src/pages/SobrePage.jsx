import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Info } from 'lucide-react'

const SobrePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header da página */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sobre O SabIA</h1>
            <p className="text-lg opacity-90">Conheça nossa plataforma de curadoria</p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">O sabIA</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              O sabIA é uma plataforma de curadoria e exploração de ferramentas de inteligência artificial 
              aplicadas ao ensino e aprendizagem de línguas. Pensado como um espaço acessível, educativo e 
              colaborativo, o sabIÁ permite que estudantes, educadores e curiosos descubram recursos 
              tecnológicos úteis para práticas linguísticas, com foco em leitura, escrita, fala, escuta, 
              vocabulário, planejamento textual, tradução, entre outros aspectos.
            </p>
            
            <p>
              Inspirado no canto curioso do sabiá, o projeto valoriza a descoberta, a diversidade e o 
              cuidado com o conhecimento compartilhado.
            </p>
          </div>

          {/* Card de destaque */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border-l-4 border-primary">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Info className="w-6 h-6 text-primary mt-1" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nossa Missão</h3>
                <p className="text-gray-600">
                  Facilitar o acesso a ferramentas de IA para ensino de línguas, oferecendo curadoria 
                  cuidadosa e orientações pedagógicas para cada recurso apresentado.
                </p>
              </div>
            </div>
          </div>

          {/* Navegação para outras páginas */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore mais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/curadoria')}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-semibold text-primary mb-1">Como funciona a curadoria</h4>
                <p className="text-sm text-gray-600">Entenda nosso processo de seleção e análise</p>
              </button>
              
              <button
                onClick={() => navigate('/categorias')}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-semibold text-primary mb-1">Conheça as categorias</h4>
                <p className="text-sm text-gray-600">Veja como organizamos as ferramentas</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SobrePage