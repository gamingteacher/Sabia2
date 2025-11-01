import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

export default function ModeloLivrePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header com navegação */}
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Voltar para o início
          </Link>
        </div>

        {/* Título centralizado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Modelo <span className="text-yellow-500 bg-clip-text text-6xl md:text-7xl font-black">L.I.V.R.E.</span>
          </h1>
        </div>

        {/* Introdução */}
        <div className="p-8 mb-12">
          <p className="text-lg leading-relaxed text-left max-w-3xl mx-auto">
            O modelo L.I.V.R.E. foi criado para orientar estudantes, professores e curiosos a analisarem criticamente o uso de ferramentas de inteligência artificial na aprendizagem de línguas. Cada letra representa uma dimensão importante a considerar antes de adotar uma tecnologia.
          </p>
        </div>

        {/* Cada letra do modelo */}
        <div className="space-y-6 mb-12">
          {/* L - Linguagem */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center p-6 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">L</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Linguagem</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  A ferramenta favorece práticas reais de linguagem ou apenas respostas mecânicas?
                </p>
              </div>
            </div>
          </div>

          {/* I - Intencionalidade */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center p-6 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">I</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Intencionalidade</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  O usuário tem clareza sobre o objetivo do uso? É guiado ou apenas replicado?
                </p>
              </div>
            </div>
          </div>

          {/* V - Visibilidade dos Processos */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center p-6 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">V</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Visibilidade dos Processos</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  A ferramenta permite compreender como a IA funciona ou é uma "caixa-preta"?
                </p>
              </div>
            </div>
          </div>

          {/* R - Relevância Educacional */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center p-6 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">R</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Relevância Educacional</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  A proposta da ferramenta se conecta a objetivos de aprendizagem ou só entretém?
                </p>
              </div>
            </div>
          </div>

          {/* E - Ética e Autoria */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center p-6 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">E</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Ética e Autoria</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  Há transparência no uso, proteção de dados e reconhecimento de autoria?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Como usar o modelo */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Como usar o modelo?</h2>
          
          <p className="text-lg mb-6 text-center">
            Você pode utilizar o L.I.V.R.E. para:
          </p>

          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg">
                Guiar reflexões individuais ou em grupo sobre ferramentas digitais
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg">
                Avaliar criticamente o uso de IA na sua rotina de estudo
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg">
                Incluir em projetos, oficinas ou momentos formativos
              </p>
            </div>
          </div>
        </div>

        {/* Navegação adicional */}
        <div className="mt-12 text-center">
          <Link 
            to="/categorias" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Conheça as Categorias
          </Link>
        </div>
      </div>
    </div>
  )
}