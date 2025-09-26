import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import FooterNav from './FooterNav'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navegação superior */}
      <Navbar />
      
      {/* Conteúdo principal */}
      <main className="pb-20">
        <Outlet />
      </main>
      
      {/* Navegação inferior */}
      <FooterNav />
    </div>
  )
}

export default Layout