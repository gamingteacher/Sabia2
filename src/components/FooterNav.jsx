import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../stores'
import { 
  Home, 
  BookOpen, 
  Grid3X3, 
  Settings, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react'

const FooterNav = () => {
  const { isAuthenticated, hasToolAccess, user, teamData, logout } = useAuthStore()

  // Itens base da navegação (lado esquerdo)
  const baseItems = [
    {
      name: 'Ninho',
      path: '/',
      icon: Home,
    },
    {
      name: 'Ferramentas',
      path: '/ferramentas',
      icon: Settings,
    },
    {
      name: 'Posts',
      path: '/posts',
      icon: BookOpen,
    },
  ]

  // Obter nome do usuário
  const userName = teamData?.nome || user?.email?.split('@')[0] || 'Usuário'

  return (
    <nav className="fixed bottom-4 left-12 right-12 bg-white/70 backdrop-blur rounded-xl border-primary/20 px-4 py-2 z-50 shadow-lg">
      <div className="flex items-center justify-between w-full">
        {/* Espaço vazio à esquerda para balanceamento */}
        <div className="flex-1"></div>
        
        {/* Itens principais (centralizados) */}
        <div className="flex items-center justify-center space-x-4">
          {baseItems.map((item) => {
            const IconComponent = item.icon
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center px-2 py-1 ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                <IconComponent className="w-6 h-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </NavLink>
            )
          })}
        </div>

        {/* Área de autenticação/usuário (lado direito) */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center px-3 py-1 ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-xs mt-1">Login</span>
            </NavLink>
          ) : (
            <>
              {/* Nome do usuário */}
              <div className="flex flex-col items-center justify-center px-2 py-1">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs mt-1 text-gray-600 max-w-16 truncate">
                  {userName}
                </span>
              </div>

              {/* Painel Admin (se tiver acesso) */}
              {hasToolAccess() && (
                <NavLink
                  to="/painel"
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center px-3 py-1 ${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }
                >
                  <LayoutDashboard className="w-6 h-6" />
                  <span className="text-xs mt-1">Painel</span>
                </NavLink>
              )}

              {/* Botão Sair */}
              <button
                onClick={logout}
                className="flex flex-col items-center justify-center px-3 py-1 text-gray-500 hover:text-red-600 transition-colors"
                title="Sair"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-xs mt-1">Sair</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default FooterNav