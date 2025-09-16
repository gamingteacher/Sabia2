import React from 'react'
import { useNavigate } from 'react-router-dom'

const CuradoriaPage = () => {
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
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Como funciona a curadoria no sabIA</h1>
            <p className="text-lg opacity-90">Nosso processo de seleção e análise</p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          
          {/* Introdução */}
          <div className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              O sabIÁ nasceu para ajudar estudantes, professores e curiosos a explorar de forma crítica 
              e criativa as ferramentas de inteligência artificial aplicadas à aprendizagem de línguas.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Para isso, não basta listar ferramentas: é preciso organizar, contextualizar e explicar 
              como cada uma delas pode (ou não) contribuir para processos de ensino e aprendizagem.
            </p>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border-l-4 border-primary">
              <p className="text-gray-700 font-medium">
                Essa é a função da nossa curadoria. Todas as ferramentas incluídas no sabIÁ passam 
                por um processo de seleção e análise, em que buscamos identificar:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">quais são seus usos nativos (ou seja, para que servem originalmente); e</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">quais são seus potenciais pedagógicos para a aprendizagem de línguas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção Para que serve */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Para que serve</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Este campo descreve a função principal da ferramenta: o que ela faz e qual é seu uso nativo, 
              independentemente do contexto educacional.
            </p>
            
            <p className="text-gray-600 mb-4">
              Aqui você encontrará descrições objetivas e diretas sobre o funcionamento da ferramenta.
            </p>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Exemplos:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Gerar imagens a partir de descrições em texto.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Transcrever automaticamente áudios e vídeos.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Simular diálogos interativos em diferentes contextos.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção Como pode ajudar */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Como pode ajudar</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Este campo indica potenciais da ferramenta para a aprendizagem de línguas. Em outras palavras, 
              destacamos como ela pode ser integrada em percursos de aprendizagem autônoma ou em práticas pedagógicas.
            </p>
            
            <p className="text-gray-600 mb-4">
              Aqui você encontrará potenciais educacionais: possibilidades de uso que ampliam a aprendizagem.
            </p>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Exemplos:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Estimular a produção escrita por meio de atividades criativas com imagens.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Apoiar o desenvolvimento da escuta e da compreensão oral com transcrições acompanhadas de áudio.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Promover a prática de fluência em conversas simuladas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Navegação para outras páginas */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore mais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/sobre')}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-semibold text-primary mb-1">Sobre o sabIA</h4>
                <p className="text-sm text-gray-600">Conheça nossa plataforma e missão</p>
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

export default CuradoriaPage