import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, supabaseService } from '../services/supabase'

// Store de autenticação
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAdmin: false,
      loading: false,

      // Inicializar autenticação
      initAuth: async () => {
        set({ loading: true })
        try {
          const session = await supabaseService.getCurrentSession()
          if (session?.user) {
            const isAdmin = await supabaseService.isUserAdmin(session.user.id)
            set({
              user: session.user,
              session: session,
              isAdmin: isAdmin,
              loading: false
            })
          } else {
            set({ user: null, session: null, isAdmin: false, loading: false })
          }
        } catch (error) {
          console.error('Erro ao inicializar autenticação:', error)
          set({ user: null, session: null, isAdmin: false, loading: false })
        }
      },

      // Login
      signIn: async (email, password) => {
        set({ loading: true })
        try {
          const { user, session } = await supabaseService.signIn(email, password)
          const isAdmin = await supabaseService.isUserAdmin(user.id)
          
          set({
            user: user,
            session: session,
            isAdmin: isAdmin,
            loading: false
          })
          
          return { success: true }
        } catch (error) {
          set({ loading: false })
          return { success: false, error: error.message }
        }
      },

      // Logout
      signOut: async () => {
        try {
          await supabaseService.signOut()
          set({ user: null, session: null, isAdmin: false })
        } catch (error) {
          console.error('Erro ao fazer logout:', error)
        }
      },

      // Verificar se está logado
      isAuthenticated: () => {
        const { user } = get()
        return !!user
      },

      // Verificar se é admin
      isUserAdmin: () => {
        const { isAdmin } = get()
        return isAdmin
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAdmin: state.isAdmin
      })
    }
  )
)

// Store para ferramentas
export const useFerramentasStore = create((set, get) => ({
  ferramentas: [],
  ferramentaAtual: null,
  loading: false,
  error: null,

  // Carregar todas as ferramentas
  loadFerramentas: async () => {
    set({ loading: true, error: null })
    try {
      const ferramentas = await supabaseService.getFerramentas()
      set({ ferramentas, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Carregar ferramenta específica
  loadFerramenta: async (id) => {
    set({ loading: true, error: null })
    try {
      const ferramenta = await supabaseService.getFerramentaById(id)
      set({ ferramentaAtual: ferramenta, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Criar nova ferramenta
  createFerramenta: async (ferramentaData) => {
    set({ loading: true, error: null })
    try {
      const novaFerramenta = await supabaseService.createFerramenta(ferramentaData)
      const { ferramentas } = get()
      set({
        ferramentas: [novaFerramenta, ...ferramentas],
        loading: false
      })
      return { success: true, data: novaFerramenta }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  // Atualizar ferramenta
  updateFerramenta: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      const ferramentaAtualizada = await supabaseService.updateFerramenta(id, updates)
      const { ferramentas } = get()
      const ferramentasAtualizadas = ferramentas.map(f => 
        f.id === id ? ferramentaAtualizada : f
      )
      set({
        ferramentas: ferramentasAtualizadas,
        ferramentaAtual: ferramentaAtualizada,
        loading: false
      })
      return { success: true, data: ferramentaAtualizada }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  // Deletar ferramenta
  deleteFerramenta: async (id) => {
    set({ loading: true, error: null })
    try {
      await supabaseService.deleteFerramenta(id)
      const { ferramentas } = get()
      const ferramentasAtualizadas = ferramentas.filter(f => f.id !== id)
      set({ ferramentas: ferramentasAtualizadas, loading: false })
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  // Limpar erro
  clearError: () => set({ error: null })
}))

// Store para páginas relacionadas
export const usePaginasStore = create((set, get) => ({
  paginas: [],
  paginaAtual: null,
  loading: false,
  error: null,

  // Carregar páginas relacionadas
  loadPaginas: async (ferramentaId = null) => {
    set({ loading: true, error: null })
    try {
      const paginas = await supabaseService.getPaginasRelacionadas(ferramentaId)
      set({ paginas, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Carregar página específica
  loadPagina: async (id) => {
    set({ loading: true, error: null })
    try {
      const pagina = await supabaseService.getPaginaRelacionadaById(id)
      set({ paginaAtual: pagina, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Criar nova página
  createPagina: async (paginaData) => {
    set({ loading: true, error: null })
    try {
      const novaPagina = await supabaseService.createPaginaRelacionada(paginaData)
      const { paginas } = get()
      set({
        paginas: [novaPagina, ...paginas],
        loading: false
      })
      return { success: true, data: novaPagina }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  // Atualizar página
  updatePagina: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      const paginaAtualizada = await supabaseService.updatePaginaRelacionada(id, updates)
      const { paginas } = get()
      const paginasAtualizadas = paginas.map(p => 
        p.id === id ? paginaAtualizada : p
      )
      set({
        paginas: paginasAtualizadas,
        paginaAtual: paginaAtualizada,
        loading: false
      })
      return { success: true, data: paginaAtualizada }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  // Deletar página
  deletePagina: async (id) => {
    set({ loading: true, error: null })
    try {
      await supabaseService.deletePaginaRelacionada(id)
      const { paginas } = get()
      const paginasAtualizadas = paginas.filter(p => p.id !== id)
      set({ paginas: paginasAtualizadas, loading: false })
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },

  // Limpar erro
  clearError: () => set({ error: null })
}))

// Listener para mudanças de autenticação
supabase.auth.onAuthStateChange(async (event, session) => {
  const { initAuth } = useAuthStore.getState()
  await initAuth()
})