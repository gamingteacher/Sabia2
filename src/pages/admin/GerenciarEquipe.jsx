import React, { useState, useEffect } from 'react'
import { Shield, User, Users, Trash2 } from 'lucide-react'
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
      
      console.log('Carregando equipe...')
      
      // Consultar diretamente a tabela equipe com timestamp para evitar cache
      const { data, error } = await supabase
        .from('equipe')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar equipe:', error)
        setError('Erro ao carregar equipe: ' + error.message)
        return
      }

      console.log('Equipe carregada:', data?.length || 0, 'membros')
      console.log('Dados da equipe:', data)
      
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
      
      // Buscar dados do usuário antes de remover
      const { data: existingUser, error: checkError } = await supabase
        .from('equipe')
        .select('nome, email')
        .eq('id', userId)
        .single()

      if (checkError || !existingUser) {
        setError('Usuário não encontrado na equipe')
        return
      }

      // Usar função RPC para remover
      const { data, error } = await supabase
        .rpc('remove_team_member', { member_id: userId })

      if (error) {
        console.error('Erro ao remover usuário:', error)
        setError('Erro ao remover usuário: ' + error.message)
        return
      }

      if (!data) {
        setError('Usuário não foi encontrado ou não pôde ser removido')
        return
      }

      setSuccess(`Usuário "${existingUser.nome}" removido da equipe com sucesso!`)
      
      // Atualizar estado local imediatamente
      setEquipe(prevEquipe => prevEquipe.filter(membro => membro.id !== userId))
      
      // Recarregar lista após um tempo
      setTimeout(() => {
        loadEquipe()
      }, 500)
      
    } catch (error) {
      console.error('Erro ao remover usuário:', error)
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
      
      // Buscar dados do usuário antes de alterar
      const { data: existingUser, error: checkError } = await supabase
        .from('equipe')
        .select('nome')
        .eq('id', userId)
        .single()

      if (checkError || !existingUser) {
        setError('Usuário não encontrado na equipe')
        return
      }

      // Usar função RPC para alterar papel
      const { data, error } = await supabase
        .rpc('update_team_member_role', { 
          member_id: userId, 
          new_role: novoPapel 
        })

      if (error) {
        console.error('Erro ao alterar papel:', error)
        setError('Erro ao alterar papel: ' + error.message)
        return
      }

      if (!data) {
        setError('Usuário não foi encontrado ou papel não pôde ser alterado')
        return
      }

      setSuccess(`Papel de "${existingUser.nome}" alterado para "${novoPapel}" com sucesso!`)
      await loadEquipe() // Recarregar lista
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
          <Shield className="w-3 h-3 mr-1" />
          Administrador
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <User className="w-3 h-3 mr-1" />
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
            <Users className="w-8 h-8 text-gray-400" />
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
                      <Trash2 className="w-4 h-4" />
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