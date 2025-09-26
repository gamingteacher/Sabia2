import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFerramentasStore } from '../../stores'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const CriarFerramenta = () => {
  const navigate = useNavigate()
  const { createFerramenta, loading } = useFerramentasStore()
  
  const [formData, setFormData] = useState({
    nome: '',
    link_site: '',
    funcao: '',
    como_pode_ajudar: '',
    tags: ''
  })
  
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.nome.trim()) {
      setError('Nome da ferramenta é obrigatório')
      return
    }

    // Preparar dados para envio
    const dadosFerramenta = {
      nome: formData.nome.trim(),
      link_site: formData.link_site.trim() || null,
      funcao: formData.funcao.trim() || null,
      como_pode_ajudar: formData.como_pode_ajudar.trim() || null,
      tags: formData.tags.trim() ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    }

    const result = await createFerramenta(dadosFerramenta)
    
    if (result.success) {
      navigate('/admin/ferramentas')
    } else {
      setError(result.error || 'Erro ao criar ferramenta')
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Criar nova ferramenta para a plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Criar Nova Ferramenta</h2>
        <button
          onClick={() => navigate('/painel/ferramentas')}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Voltar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Ferramenta *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Ex: ChatGPT"
              required
            />
          </div>

          <div>
            <label htmlFor="link_site" className="block text-sm font-medium text-gray-700 mb-2">
              Link do Site
            </label>
            <input
              type="url"
              id="link_site"
              name="link_site"
              value={formData.link_site}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="https://exemplo.com"
            />
          </div>

          <div>
            <label htmlFor="funcao" className="block text-sm font-medium text-gray-700 mb-2">
              Função
            </label>
            <textarea
              id="funcao"
              name="funcao"
              value={formData.funcao}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              placeholder="Descreva a função principal da ferramenta..."
            />
          </div>

          <div>
            <label htmlFor="como_pode_ajudar" className="block text-sm font-medium text-gray-700 mb-2">
              Como Pode Ajudar
            </label>
            <textarea
              id="como_pode_ajudar"
              name="como_pode_ajudar"
              value={formData.como_pode_ajudar}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              placeholder="Explique como a ferramenta pode ajudar no ensino de línguas..."
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="conversação, escrita, gramática (separadas por vírgula)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separe as tags por vírgula
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Criando...
                </>
              ) : (
                'Criar Ferramenta'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/ferramentas')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
        </div>
        
        {/* Footer Navigation */}
        <FooterNav />
      </div>
    </div>
    </>
  )
}

export default CriarFerramenta