import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { usePaginasStore } from '../stores'
import 'prismjs/themes/prism.css'

const PostPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { paginaAtual, loading, error, loadPagina } = usePaginasStore()

  useEffect(() => {
    // Extrair ID do slug (formato: titulo-123)
    const id = slug.split('-').pop()
    if (id && !isNaN(id)) {
      loadPagina(parseInt(id))
    }
  }, [slug, loadPagina])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando post...</p>
        </div>
      </div>
    )
  }

  if (error || !paginaAtual) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || 'Post não encontrado'}
          </p>
          <button
            onClick={() => navigate('/posts')}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
          >
            Voltar aos Posts
          </button>
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
              Explore nosso conteúdo sobre inteligência artificial e ensino de línguas
            </p>
          </div>
        </div>
      </header>

      {/* Navegação */}
      <section className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/posts')}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Posts
            </button>
            
            <div className="text-sm text-gray-600">
              {new Date(paginaAtual.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Card do post */}
        <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          {/* Header do card */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 mr-4">
                {paginaAtual.titulo}
              </h1>
              {paginaAtual.ferramentas && (
                <Link
                  to="/ferramentas"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors shrink-0"
                  title="Ver ferramenta relacionada"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Autor */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Autor</h4>
                <p className="text-sm text-gray-600">
                  {paginaAtual.autor || 'Não informado'}
                </p>
              </div>
              
              {/* Ferramenta relacionada */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Ferramenta Relacionada</h4>
                <div className="flex items-center gap-2">
                  {paginaAtual.ferramentas ? (
                    <Link
                      to="/ferramentas"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {paginaAtual.ferramentas.nome}
                    </Link>
                  ) : (
                    <span className="text-xs text-gray-400">Nenhuma</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo do post */}
          <div className="p-6">
            <div className="markdown-content max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {paginaAtual.conteudo || 'Sem conteúdo disponível.'}
              </ReactMarkdown>
            </div>
          </div>

          {/* Footer do card */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Publicado em {new Date(paginaAtual.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    weekday: 'long'
                  })}
                </span>
              </div>
              
              {paginaAtual.ferramentas && (
                <Link
                  to="/ferramentas"
                  className="text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Ver Ferramenta
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

export default PostPage