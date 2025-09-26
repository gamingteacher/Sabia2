import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import { useAuthStore } from '../../stores'
import AdminHeader from '../../components/AdminHeader'
import FooterNav from '../../components/FooterNav'

const GerenciarSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [processingId, setProcessingId] = useState(null)
  const { user } = useAuthStore()

  useEffect(() => {
    loadSolicitacoes()
  }, [])

  const loadSolicitacoes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('solicitacoes_acesso')
        .select('*')
        .eq('status', 'pendente')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar solicitações:', error)
        setError('Erro ao carregar solicitações')
        return
      }

      setSolicitacoes(data || [])
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error)
      setError('Erro ao carregar solicitações')
    } finally {
      setLoading(false)
    }
  }

  const aprovarSolicitacao = async (solicitacaoId) => {
    if (!user?.email) {
      setError('Usuário não autenticado')
      return
    }

    try {
      setProcessingId(solicitacaoId)
      setError('')
      setSuccess('')
      
      // Buscar a solicitação primeiro
      const { data: solicitacao, error: fetchError } = await supabase
        .from('solicitacoes_acesso')
        .select('*')
        .eq('id', solicitacaoId)
        .single()

      if (fetchError) {
        console.error('Erro ao buscar solicitação:', fetchError)
        setError('Erro ao buscar solicitação: ' + fetchError.message)
        return
      }

      // Atualizar status da solicitação
      const { error: updateError } = await supabase
        .from('solicitacoes_acesso')
        .update({ 
          status: 'aprovada',
          aprovada_por: user.email,
          updated_at: new Date().toISOString()
        })
        .eq('id', solicitacaoId)

      if (updateError) {
        console.error('Erro ao aprovar solicitação:', updateError)
        setError('Erro ao aprovar solicitação: ' + updateError.message)
        return
      }

      // Criar entrada na tabela equipe se não existir
      const { data: equipeData, error: equipeError } = await supabase
        .from('equipe')
        .upsert({
          email: solicitacao.email,
          nome: solicitacao.nome,
          instituicao: solicitacao.instituicao,
          papel: 'membro'
        }, { onConflict: 'email' })
        .select()

      if (equipeError) {
        console.warn('Aviso ao criar entrada na equipe:', equipeError)
        // Não falha completamente, apenas avisa
      }

      setSuccess('Solicitação aprovada com sucesso!')
      
      // Recarregar lista
      await loadSolicitacoes()
    } catch (error) {
      console.error('Erro ao aprovar:', error)
      setError('Erro ao aprovar solicitação: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  const rejeitarSolicitacao = async (solicitacaoId) => {
    try {
      setProcessingId(solicitacaoId)
      setError('')
      setSuccess('')
      
      const { error } = await supabase
        .from('solicitacoes_acesso')
        .update({ status: 'rejeitado' })
        .eq('id', solicitacaoId)

      if (error) {
        console.error('Erro ao rejeitar solicitação:', error)
        setError('Erro ao rejeitar solicitação')
        return
      }

      // Recarregar lista
      await loadSolicitacoes()
      setSuccess('Solicitação rejeitada com sucesso')
    } catch (error) {
      console.error('Erro ao rejeitar:', error)
      setError('Erro ao rejeitar solicitação')
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">Carregando solicitações...</span>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Gerencie solicitações de acesso à plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Solicitações de Acesso</h2>
        <button
          onClick={loadSolicitacoes}
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

      {solicitacoes.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">Nenhuma solicitação pendente</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {solicitacoes.map((solicitacao) => (
            <div key={solicitacao.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {solicitacao.nome}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Email:</strong> {solicitacao.email}</p>
                    <p><strong>Instituição:</strong> {solicitacao.instituicao}</p>
                    <p><strong>Solicitado em:</strong> {formatDate(solicitacao.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => aprovarSolicitacao(solicitacao.id)}
                    disabled={processingId === solicitacao.id}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {processingId === solicitacao.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Aprovar
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => rejeitarSolicitacao(solicitacao.id)}
                    disabled={processingId === solicitacao.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Rejeitar
                  </button>
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

export default GerenciarSolicitacoes