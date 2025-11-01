import React, { useEffect, useState, useMemo } from 'react'
import { Save, X, Plus, Trash2, Edit, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { useFerramentasStore } from '../../stores'
import FooterNav from '../../components/FooterNav'
import AdminHeader from '../../components/AdminHeader'

const ListarFerramentas = () => {
  const { ferramentas, loading, error, loadFerramentas, deleteFerramenta, createFerramenta, updateFerramenta } = useFerramentasStore()
  const [editingId, setEditingId] = useState(null)
  const [newRow, setNewRow] = useState({
    nome: '',
    link_site: '',
    funcao: '',
    como_pode_ajudar: '',
    tags: ''
  })
  const [editingData, setEditingData] = useState({})
  const [saving, setSaving] = useState(false)
  const [sortBy, setSortBy] = useState('nome') // 'nome' ou 'created_at'
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' ou 'desc'
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir a ferramenta "${nome}"?`)) {
      const result = await deleteFerramenta(id)
      if (!result.success) {
        alert('Erro ao excluir ferramenta: ' + result.error)
      }
    }
  }

  const handleEdit = (ferramenta) => {
    setEditingId(ferramenta.id)
    setEditingData({
      nome: ferramenta.nome || '',
      link_site: ferramenta.link_site || '',
      funcao: ferramenta.funcao || '',
      como_pode_ajudar: ferramenta.como_pode_ajudar || '',
      tags: Array.isArray(ferramenta.tags) ? ferramenta.tags.join(', ') : ''
    })
  }

  const handleSave = async (id = null) => {
    setSaving(true)
    try {
      const data = id ? editingData : newRow
      
      // Validações básicas
      if (!data.nome || !data.nome.trim()) {
        alert('Nome da ferramenta é obrigatório')
        return
      }

      const tagsArray = typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : Array.isArray(data.tags) ? data.tags : []

      const ferramentaData = {
        nome: data.nome.trim(),
        link_site: data.link_site ? data.link_site.trim() : null,
        funcao: data.funcao ? data.funcao.trim() : null,
        como_pode_ajudar: data.como_pode_ajudar ? data.como_pode_ajudar.trim() : null,
        tags: tagsArray.length > 0 ? tagsArray : null
      }

      console.log('Dados preparados para salvar:', ferramentaData)

      let result
      if (id) {
        result = await updateFerramenta(id, ferramentaData)
      } else {
        result = await createFerramenta(ferramentaData)
      }

      if (result.success) {
        if (id) {
          setEditingId(null)
          setEditingData({})
        } else {
          setNewRow({
            nome: '',
            link_site: '',
            funcao: '',
            como_pode_ajudar: '',
            tags: ''
          })
        }
      } else {
        alert('Erro ao salvar: ' + result.error)
      }
    } catch (error) {
      console.error('Erro no handleSave:', error)
      alert('Erro ao salvar: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingData({})
  }

  const handleNewRowChange = (field, value) => {
    setNewRow(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditingChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Filtrar e ordenar ferramentas
  const filteredAndSortedFerramentas = useMemo(() => {
    let filtered = ferramentas.filter(ferramenta =>
      ferramenta.nome.toLowerCase().includes(nameFilter.toLowerCase())
    )

    filtered.sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'nome') {
        comparison = a.nome.localeCompare(b.nome)
      } else if (sortBy === 'created_at') {
        const dateA = new Date(a.created_at || 0)
        const dateB = new Date(b.created_at || 0)
        comparison = dateA - dateB
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [ferramentas, nameFilter, sortBy, sortOrder])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400" />
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 text-primary" />
      : <ArrowDown className="w-3 h-3 ml-1 text-primary" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ferramentas...</p>
        </div>
      </div>
    )
  }

  const renderCell = (ferramenta, field, isEditing) => {
    if (isEditing) {
      if (field === 'tags') {
        return (
          <textarea
            value={editingData[field] || ''}
            onChange={(e) => handleEditingChange(field, e.target.value)}
            placeholder="Tag1, Tag2, Tag3"
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
            rows="2"
          />
        )
      }
      
      return (
        <textarea
          value={editingData[field] || ''}
          onChange={(e) => handleEditingChange(field, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
          rows={field === 'funcao' || field === 'como_pode_ajudar' ? "3" : "1"}
          placeholder={field === 'link_site' ? 'https://...' : `${field.charAt(0).toUpperCase()}${field.slice(1)}`}
        />
      )
    }

    // Modo visualização
    if (field === 'tags') {
      return (
        <div className="flex flex-wrap gap-1">
          {ferramenta.tags && ferramenta.tags.length > 0 ? (
            ferramenta.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-secondary/20 text-primary rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">-</span>
          )}
        </div>
      )
    }

    if (field === 'link_site' && ferramenta[field]) {
      return (
        <a 
          href={ferramenta[field]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm truncate max-w-xs block"
        >
          {ferramenta[field]}
        </a>
      )
    }

    return (
      <div className="text-sm text-gray-900 max-w-xs">
        {ferramenta[field] || '-'}
      </div>
    )
  }

  const renderNewRowCell = (field) => {
    if (field === 'tags') {
      return (
        <textarea
          value={newRow[field] || ''}
          onChange={(e) => handleNewRowChange(field, e.target.value)}
          placeholder="Tag1, Tag2, Tag3"
          className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
          rows="2"
        />
      )
    }
    
    return (
      <textarea
        value={newRow[field] || ''}
        onChange={(e) => handleNewRowChange(field, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
        rows={field === 'funcao' || field === 'como_pode_ajudar' ? "3" : "1"}
        placeholder={field === 'link_site' ? 'https://...' : `${field.charAt(0).toUpperCase()}${field.slice(1)}`}
      />
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Gerencie e organize ferramentas da plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciar Ferramentas</h2>
          <div className="text-sm text-gray-600">
            Total: {filteredAndSortedFerramentas.length} de {ferramentas.length} ferramenta{ferramentas.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar
              </label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Digite o nome da ferramenta..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />  
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('nome')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors flex items-center ${
                  sortBy === 'nome' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Nome {getSortIcon('nome')}
              </button>
              <button
                onClick={() => handleSort('created_at')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors flex items-center ${
                  sortBy === 'created_at' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Data {getSortIcon('created_at')}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            Erro ao carregar ferramentas: {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Link
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Função
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Como pode ajudar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Linha para nova ferramenta - sempre no topo */}
                <tr className="bg-green-50 border-b-2 border-green-200">
                  <td className="px-4 py-3">
                    {renderNewRowCell('nome')}
                  </td>
                  <td className="px-4 py-3">
                    {renderNewRowCell('link_site')}
                  </td>
                  <td className="px-4 py-3">
                    {renderNewRowCell('funcao')}
                  </td>
                  <td className="px-4 py-3">
                    {renderNewRowCell('como_pode_ajudar')}
                  </td>
                  <td className="px-4 py-3">
                    {renderNewRowCell('tags')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleSave()}
                      disabled={saving || !newRow.nome.trim()}
                      className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50"
                      title="Adicionar ferramenta"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                
                {filteredAndSortedFerramentas.map((ferramenta) => {
                  const isEditing = editingId === ferramenta.id
                  return (
                    <tr key={ferramenta.id} className={isEditing ? "bg-blue-50" : "hover:bg-gray-50"}>
                      <td className="px-4 py-3">
                        {renderCell(ferramenta, 'nome', isEditing)}
                      </td>
                      <td className="px-4 py-3">
                        {renderCell(ferramenta, 'link_site', isEditing)}
                      </td>
                      <td className="px-4 py-3">
                        {renderCell(ferramenta, 'funcao', isEditing)}
                      </td>
                      <td className="px-4 py-3">
                        {renderCell(ferramenta, 'como_pode_ajudar', isEditing)}
                      </td>
                      <td className="px-4 py-3">
                        {renderCell(ferramenta, 'tags', isEditing)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSave(ferramenta.id)}
                                disabled={saving}
                                className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50"
                                title="Salvar"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                                title="Cancelar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(ferramenta)}
                                className="text-primary hover:text-primary/80 transition-colors"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(ferramenta.id, ferramenta.nome)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {ferramentas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma ferramenta cadastrada. Use a linha verde no topo da tabela para adicionar a primeira ferramenta.</p>
          </div>
        )}

        {filteredAndSortedFerramentas.length === 0 && ferramentas.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma ferramenta encontrada com o filtro aplicado.</p>
          </div>
        )}
        
        {/* Footer Navigation */}
        <FooterNav />
      </div>
    </div>
    </>
  )
}

export default ListarFerramentas