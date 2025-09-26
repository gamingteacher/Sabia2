import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import { useAuthStore } from '../../stores'
import FooterNav from '../../components/FooterNav'
import AdminHeader from '../../components/AdminHeader'

const GerenciarEquipe = () => {
  const [equipe, setEquipe] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [processingId, setProcessingId] = useState(null)
  const { user } = useAuthStore()

  useEffect(() => {
    loadEquipe()
  }, [])

  const loadEquipe = async () => {
    if (!user?.email) {
      setError('Usuário não autenticado')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      // Consultar diretamente a tabela equipe
      const { data, error } = await supabase
        .from('equipe')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar equipe:', error)
        setError('Erro ao carregar equipe: ' + error.message)
        return
      }

      setEquipe(data || [])
    } catch (error) {
      console.error('Erro ao carregar equipe:', error)
      setError('Erro ao carregar equipe: ' + error.message)
    } finally {
      setLoading(false)
    }
  }



  const removerUsuario = async (userId) => {
    if (!user?.email) {
      setError('Usuário não autenticado')
      return
    }

    if (!confirm('Tem certeza que deseja remover este usuário da equipe?')) {
      return
    }

    try {
      setProcessingId(userId)
      setError('')
      setSuccess('')
      
      // Remover usuário diretamente da tabela
      const { data, error } = await supabase
        .from('equipe')
        .delete()
        .eq('id', userId)
        .select()

      if (error) {
        console.error('Erro ao remover usuário:', error)
        setError('Erro ao remover usuário: ' + error.message)
        return
      }

      if (data && data.length > 0) {
        setSuccess('Usuário removido da equipe com sucesso!')
        await loadEquipe() // Recarregar lista
      } else {
        setError('Usuário não encontrado')
      }
    } catch (error) {
      console.error('Erro ao remover:', error)
      setError('Erro ao remover usuário: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  const alterarPapel = async (userId, novoPapel) => {
    if (!user?.email) {
      setError('Usuário não autenticado')
      return
    }

    try {
      setProcessingId(userId)
      setError('')
      setSuccess('')
      
      // Atualizar papel na tabela equipe
      const { data, error } = await supabase
        .from('equipe')
        .update({ 
          papel: novoPapel,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()

      if (error) {
        console.error('Erro ao alterar papel:', error)
        setError('Erro ao alterar papel: ' + error.message)
        return
      }

      if (data && data.length > 0) {
        setSuccess(`Papel alterado para "${novoPapel}" com sucesso!`)
        await loadEquipe() // Recarregar lista
      } else {
        setError('Usuário não encontrado')
      }
    } catch (error) {
      console.error('Erro ao alterar papel:', error)
      setError('Erro ao alterar papel: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleBadge = (papel, isAdmin) => {
    if (isAdmin) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.75 1l2.5 4.5H17v13H3V5.5h4.75L9.75 1zM10 3.414L8.293 5.5H5v11h10V5.5h-3.293L10 3.414z" clipRule="evenodd" />
          </svg>
          Administrador
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Membro
        </span>
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">Carregando equipe...</span>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Gerencie membros da equipe e permissões" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gerenciar Equipe</h2>
        <button
          onClick={loadEquipe}
          className="px-4 py-2 bg-secondary text-gray-800 rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Atualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {equipe.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <p className="text-gray-600">Nenhum membro na equipe</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {equipe.map((membro) => (
            <div key={membro.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {membro.nome}
                    </h3>
                    {getRoleBadge(membro.papel, membro.is_admin)}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Email:</strong> {membro.email}</p>
                    <p><strong>Instituição:</strong> {membro.instituicao}</p>
                    <p><strong>Membro desde:</strong> {formatDate(membro.created_at)}</p>
                  </div>
                  
                  {/* Seletor de papel - apenas para admins */}
                  {user?.email !== membro.email && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Alterar papel:
                      </label>
                      <select
                        value={membro.papel}
                        onChange={(e) => alterarPapel(membro.id, e.target.value)}
                        disabled={processingId === membro.id}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="membro">Membro</option>
                        <option value="equipe">Equipe</option>
                        <option value="administrador">Administrador</option>
                      </select>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  {membro.email !== user?.email && (
                    <button
                      onClick={() => removerUsuario(membro.id)}
                      disabled={processingId === membro.id}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remover
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
        
        {/* Footer Navigation */}
        <FooterNav />
      </div>
    </div>
    </>
  )
}

export default GerenciarEquipe