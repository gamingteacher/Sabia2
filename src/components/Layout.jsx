import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import FooterNav from './FooterNav'

const Layout = () => {
  const location = useLocation()
  
  // Não mostrar navegações na página de login
  const showNavigations = location.pathname !== '/login'

  return (
    <div className="min-h-screen bg-background">
      {/* Navegação superior */}
      {showNavigations && <Navbar />}
      
      {/* Conteúdo principal */}
      <main className={`${showNavigations ? 'pb-20' : ''}`}>
        <Outlet />
      </main>
      
      {/* Navegação inferior */}
      {showNavigations && <FooterNav />}
    </div>
  )
}

export default Layout