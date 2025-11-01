import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import AdminHeader from '../components/AdminHeader'
import FooterNav from '../components/FooterNav'

const AdminDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState(0)

  useEffect(() => {
    // Redirecionar para ferramentas se estiver na rota base do painel
    if (location.pathname === '/painel') {
      navigate('/painel/ferramentas', { replace: true })
      return
    }
    
    // Carregar solicitações pendentes para outras páginas
    loadSolicitacoesPendentes()
  }, [location.pathname, navigate])

  const loadSolicitacoesPendentes = async () => {
    try {
      const { count, error } = await supabase
        .from('solicitacoes_acesso')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pendente')

      if (!error) {
        setSolicitacoesPendentes(count || 0)
      }
    } catch (error) {
      console.error('Erro ao carregar solicitações pendentes:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader solicitacoesPendentes={solicitacoesPendentes} />
      
      {/* Renderizar sempre o Outlet - as sub-páginas */}
      <Outlet />
        
      {/* Footer Navigation */}
      <FooterNav />
    </div>
  )
}

export default AdminDashboard