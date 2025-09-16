import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores'

const Navbar = () => {
  const { user, isAuthenticated, isUserAdmin, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">IA</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">sabIA</h1>
              <p className="text-xs text-gray-600 leading-none">Curadoria de Ferramentas IA</p>
            </div>
          </Link>

          {/* Menu Central - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/#ferramentas" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ferramentas
            </Link>
            <Link 
              to="/#categorias" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Categorias
            </Link>
            <Link 
              to="/#curadoria" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('curadoria')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Sobre
            </Link>
          </div>

          {/* Menu de Usuário */}
          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-2">
                {/* Menu Admin */}
                {isUserAdmin() && (
                  <Link
                    to="/admin"
                    className="hidden sm:inline-flex items-center px-3 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-md text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin
                  </Link>
                )}

                {/* Botão de Logout */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                  title="Sair"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:ml-2 sm:inline">Sair</span>
                </button>
              </div>
            ) : (
              /* Botão de Login */
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors rounded-md text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu Mobile - Dropdown */}
      <div className="md:hidden border-t bg-gray-50">
        <div className="px-4 py-3 space-y-2">
          <Link 
            to="/#ferramentas" 
            className="block text-gray-700 hover:text-primary transition-colors py-2 font-medium"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Ferramentas
          </Link>
          <Link 
            to="/#categorias" 
            className="block text-gray-700 hover:text-primary transition-colors py-2 font-medium"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Categorias
          </Link>
          <Link 
            to="/#curadoria" 
            className="block text-gray-700 hover:text-primary transition-colors py-2 font-medium"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('curadoria')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Sobre
          </Link>
          
          {/* Links admin no mobile */}
          {isAuthenticated() && isUserAdmin() && (
            <Link
              to="/admin"
              className="block text-primary hover:text-primary/80 transition-colors py-2 font-medium"
            >
              Painel Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar