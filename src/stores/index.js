import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/supabase'

// Store principal de autenticação
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      teamData: null,
      isLoading: false,
      isAuthenticated: false,

      // Getters computados
      isAdmin: () => {
        const { teamData } = get()
        return teamData?.papel === 'administrador'
      },

      isTeamMember: () => {
        const { teamData } = get()
        return ['administrador', 'equipe', 'membro'].includes(teamData?.papel)
      },

      isPending: () => {
        const { teamData } = get()
        return teamData?.papel === 'pendente'
      },

      hasToolAccess: () => {
        const { teamData } = get()
        return ['administrador', 'equipe', 'membro'].includes(teamData?.papel)
      },

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),

      // Login
      login: async (email, password) => {
        set({ isLoading: true })
        
        try {
          const { data, error } = await authService.signIn(email, password)
          
          if (error) {
            throw new Error(error.message)
          }

          if (data.user) {
            // Buscar dados do usuário na tabela equipe
            const { data: teamData, error: teamError } = await authService.getUserTeamData(data.user.email)
            
            if (teamError && teamError.code !== 'PGRST116') { // 116 = não encontrado
              console.warn('Erro ao buscar dados da equipe:', teamError)
            }

            set({
              user: data.user,
              teamData: teamData || null,
              isAuthenticated: true,
              isLoading: false
            })

            return { success: true, data: data.user }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Cadastro
      register: async (email, password, userData = {}) => {
        set({ isLoading: true })
        
        try {
          const { data, error } = await authService.signUp(email, password, userData)
          
          if (error) {
            throw new Error(error.message)
          }

          if (data.user) {
            // Criar entrada na tabela equipe com papel 'pendente'
            const teamUserData = {
              email: data.user.email,
              nome: userData.nome || '',
              instituicao: userData.instituicao || '',
              papel: 'pendente'
            }

            console.log('Tentando criar dados da equipe:', teamUserData)
            const { data: teamData, error: teamError } = await authService.upsertUserTeamData(teamUserData)
            
            if (teamError) {
              console.error('Erro detalhado ao criar dados da equipe:', {
                error: teamError,
                message: teamError.message,
                details: teamError.details,
                hint: teamError.hint,
                code: teamError.code
              })
            } else {
              console.log('Dados da equipe criados com sucesso:', teamData)
            }

            set({
              user: data.user,
              teamData: teamData || teamUserData,
              isAuthenticated: true,
              isLoading: false
            })

            return { success: true, data: data.user }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true })
        
        try {
          const { error } = await authService.signOut()
          
          if (error) {
            throw new Error(error.message)
          }

          set({
            user: null,
            teamData: null,
            isAuthenticated: false,
            isLoading: false
          })

          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Inicializar autenticação (verificar se há usuário logado)
      initAuth: async () => {
        set({ isLoading: true })
        
        try {
          const { user, error } = await authService.getCurrentUser()
          
          if (error) {
            throw new Error(error.message)
          }

          if (user) {
            // Buscar dados da equipe
            const { data: teamData, error: teamError } = await authService.getUserTeamData(user.email)
            
            if (teamError && teamError.code !== 'PGRST116') {
              console.warn('Erro ao buscar dados da equipe:', teamError)
            }

            set({
              user,
              teamData: teamData || null,
              isAuthenticated: true,
              isLoading: false
            })
          } else {
            set({
              user: null,
              teamData: null,
              isAuthenticated: false,
              isLoading: false
            })
          }
        } catch (error) {
          console.error('Erro ao inicializar autenticação:', error)
          set({
            user: null,
            teamData: null,
            isAuthenticated: false,
            isLoading: false
          })
        }
      },

      // Atualizar dados da equipe (após mudança de papel)
      refreshTeamData: async () => {
        const { user } = get()
        if (!user) return

        try {
          const { data: teamData, error } = await authService.getUserTeamData(user.email)
          
          if (error && error.code !== 'PGRST116') {
            throw new Error(error.message)
          }

          set({ teamData: teamData || null })
          return { success: true, data: teamData }
        } catch (error) {
          console.error('Erro ao atualizar dados da equipe:', error)
          return { success: false, error: error.message }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        teamData: state.teamData,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

// Store para gerenciamento de ferramentas (temporário - substituindo o antigo sistema)
export const useFerramentasStore = create((set, get) => ({
  ferramentas: [],
  ferramentaAtual: null,
  loading: false,
  error: null,

  loadFerramentas: async () => {
    set({ loading: true, error: null })
    try {
      // Aqui você pode implementar a lógica real
      const mockData = []
      set({ ferramentas: mockData, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  loadFerramenta: async (id) => {
    set({ loading: true, error: null })
    try {
      // Aqui você pode implementar a lógica real
      const mockData = null
      set({ ferramentaAtual: mockData, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  createFerramenta: async (data) => {
    set({ loading: true, error: null })
    try {
      // Aqui você pode implementar a lógica real
      console.log('Criando ferramenta:', data)
      set({ loading: false })
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  deleteFerramenta: async (id) => {
    set({ loading: true, error: null })
    try {
      // Aqui você pode implementar a lógica real
      console.log('Deletando ferramenta:', id)
      set({ loading: false })
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  }
}))

// Store para gerenciamento de páginas (temporário)
export const usePaginasStore = create((set, get) => ({
  paginas: [],
  loading: false,
  error: null,

  loadPaginas: async () => {
    set({ loading: true, error: null })
    try {
      // Aqui você pode implementar a lógica real
      const mockData = []
      set({ paginas: mockData, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))