import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor/nohighlight'
import { usePaginasStore, useFerramentasStore, useAuthStore } from '../../stores'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const CriarPagina = () => {
  const navigate = useNavigate()
  const { createPagina } = usePaginasStore()
  const { ferramentas, loadFerramentas } = useFerramentasStore()
  const { teamData } = useAuthStore()
  
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    ferramenta_id: null
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.titulo.trim() || !formData.conteudo.trim()) {
      alert('Título e conteúdo são obrigatórios')
      return
    }

    setSaving(true)
    
    const paginaData = {
      titulo: formData.titulo.trim(),
      conteudo: formData.conteudo.trim(),
      autor: teamData?.nome || 'Autor desconhecido',
      ferramenta_id: formData.ferramenta_id || null
    }

    const result = await createPagina(paginaData)
    
    if (result.success) {
      navigate('/painel/paginas')
    } else {
      alert('Erro ao criar página: ' + result.error)
    }
    
    setSaving(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Criar nova página para a plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Criar Nova Página</h2>
          <button
            onClick={() => navigate('/painel/paginas')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações da Página</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Título */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => handleInputChange('titulo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Digite o título da página..."
                />
              </div>

              {/* Ferramenta relacionada */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ferramenta Relacionada (opcional)
                </label>
                <select
                  value={formData.ferramenta_id || ''}
                  onChange={(e) => handleInputChange('ferramenta_id', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Nenhuma ferramenta</option>
                  {ferramentas.map(ferramenta => (
                    <option key={ferramenta.id} value={ferramenta.id}>
                      {ferramenta.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Autor (somente leitura) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  value={teamData?.nome || 'Autor desconhecido'}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Editor de conteúdo */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Conteúdo *</h3>
            
            <div data-color-mode="light">
              <MDEditor
                value={formData.conteudo}
                onChange={(value) => handleInputChange('conteudo', value || '')}
                preview="live"
                height={500}
                visibleDragBar={true}
                hideToolbar={false}
                data-color-mode="light"
                textareaProps={{
                  placeholder: 'Digite o conteúdo da página em Markdown...\n\n## Exemplo de título\n\nEste é um parágrafo de exemplo. Você pode usar **negrito**, *itálico*, [links](https://example.com) e muito mais!\n\n- Lista item 1\n- Lista item 2\n\n```javascript\n// Código de exemplo\nconsole.log("Hello World!");\n```'
                }}
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p className="mb-2">💡 <strong>Dicas de formatação Markdown:</strong></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <p>• **negrito** ou __negrito__</p>
                <p>• *itálico* ou _itálico_</p>
                <p>• [link](url) para links</p>
                <p>• ![alt](url) para imagens</p>
                <p>• `código` para código inline</p>
                <p>• {'>'}  para citações</p>
                <p>• # ## ### para títulos</p>
                <p>• - ou * para listas</p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/painel/paginas')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !formData.titulo.trim() || !formData.conteudo.trim()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvando...' : 'Criar Página'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Footer Navigation */}
      <FooterNav />
    </div>
    </>
  )
}

export default CriarPagina