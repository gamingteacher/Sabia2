import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Archive, Info } from 'lucide-react'

const CategoriasPage = () => {
  const navigate = useNavigate()

  const categorias = [
    {
      emoji: '💬',
      nome: 'Diálogo',
      descricao: 'Ferramentas que permitem simular ou praticar interações dialogadas, ajudando no desenvolvimento da competência comunicativa em situações reais ou simuladas.'
    },
    {
      emoji: '✍️',
      nome: 'Escrita',
      descricao: 'Ferramentas que apoiam a produção escrita em diferentes gêneros e contextos, seja por meio de sugestões, modelagens, revisões ou estímulos criativos.'
    },
    {
      emoji: '🎧',
      nome: 'Escuta',
      descricao: 'Ferramentas que ajudam a desenvolver a compreensão auditiva, seja com áudios, vídeos, transcrições sincronizadas ou atividades baseadas em escuta.'
    },
    {
      emoji: '🗣️',
      nome: 'Fala',
      descricao: 'Ferramentas que promovem a prática da produção oral e da fluência, seja em monólogos, diálogos, apresentações ou outros contextos.'
    },
    {
      emoji: '🤖',
      nome: 'Geração de Texto',
      descricao: 'Ferramentas cujo uso principal é gerar textos automaticamente com base em comandos, prompts ou modelos, podendo ser exploradas para produção textual, análise ou reescrita.'
    },
    {
      emoji: '📖',
      nome: 'Leitura',
      descricao: 'Ferramentas que apoiam o desenvolvimento da compreensão de textos escritos, oferecendo práticas de leitura, análise, exploração de gêneros e estratégias.'
    },
    {
      emoji: '📝',
      nome: 'Planejamento de Textos',
      descricao: 'Ferramentas que ajudam no planejamento e organização de textos, como esquemas, roteiros, mapas de ideias, estruturação de argumentos ou sequências discursivas.'
    },
    {
      emoji: '🔁',
      nome: 'Prática Autônoma',
      descricao: 'Ferramentas que favorecem o estudo autônomo e personalizado, permitindo que aprendizes definam seus percursos e ritmos de aprendizagem de forma personalizada.'
    },
    {
      emoji: '🎙️',
      nome: 'Pronúncia',
      descricao: 'Ferramentas que oferecem suporte à prática e ao aprimoramento da pronúncia, seja por meio de feedback, repetição, comparação sonora ou exercícios específicos.'
    },
    {
      emoji: '🌐',
      nome: 'Tradução',
      descricao: 'Ferramentas que oferecem recursos de tradução automática ou assistida, e que podem ser exploradas criticamente para o desenvolvimento da competência tradutiva e da consciência linguística.'
    },
    {
      emoji: '🔠',
      nome: 'Vocabulário',
      descricao: 'Ferramentas que apoiam a ampliação, exploração e consolidação do vocabulário, seja em atividades de prática, gamificação, glossários interativos ou construção de repertório lexical.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header da página */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Archive className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Conheça as Categorias</h1>
            <p className="text-lg opacity-90">Organização linguístico-pedagógica das ferramentas</p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introdução */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cada ferramenta no sabIÁ é classificada em uma ou mais categorias linguístico-pedagógicas, 
              que ajudam você a navegar e encontrar recursos alinhados aos seus objetivos.
            </p>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border-l-4 border-primary">
              <p className="text-gray-700">
                As categorias não são apenas técnicas, mas organizadas com foco em práticas linguísticas e educacionais.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categorias.map((categoria, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-transparent hover:border-primary"
            >
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-3 flex-shrink-0">{categoria.emoji}</span>
                <h3 className="text-xl font-bold text-gray-800">{categoria.nome}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {categoria.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Nota sobre múltiplas categorias */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="w-6 h-6 text-secondary mt-1" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Categorias Múltiplas</h3>
              <p className="text-gray-600">
                Uma ferramenta pode aparecer em mais de uma categoria, pois seus usos são múltiplos e flexíveis.
              </p>
            </div>
          </div>

          {/* Navegação para outras páginas */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Explore mais</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/sobre')}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h5 className="font-semibold text-primary mb-1">Sobre o sabIA</h5>
                <p className="text-sm text-gray-600">Conheça nossa plataforma e missão</p>
              </button>
              
              <button
                onClick={() => navigate('/curadoria')}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h5 className="font-semibold text-primary mb-1">Como funciona a curadoria</h5>
                <p className="text-sm text-gray-600">Entenda nosso processo de seleção</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriasPage