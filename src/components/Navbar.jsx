import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/#ferramentas" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ferramentas
            </Link>
            <Link to="/#categorias" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Categorias
            </Link>
            <Link to="/#curadoria" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('curadoria')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Sobre
            </Link>
          </div>

          {/* Menu Direito */}
          <div className="flex items-center space-x-4">
            {/* Menu Hamburguer - Mobile */}
            <div className="md:hidden">
              <button 
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Menu"
                onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div id="mobile-menu" className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-primary transition-colors py-2 font-medium"
          >
            Início
          </Link>
          <Link 
            to="/#ferramentas" 
            className="block text-gray-700 hover:text-primary transition-colors py-2 font-medium"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' })
              document.getElementById('mobile-menu')?.classList.add('hidden')
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
              document.getElementById('mobile-menu')?.classList.add('hidden')
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
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
          >
            Sobre
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar