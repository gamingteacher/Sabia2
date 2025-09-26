// Versão simplificada do store para debug
import { create } from 'zustand'

export const useAuthStoreSimple = create((set, get) => ({
  user: null,
  loading: false,
  
  setLoading: (loading) => set({ loading }),
  
  setUser: (user) => set({ user, loading: false }),
  
  clearUser: () => set({ user: null, loading: false })
}))

export default useAuthStoreSimple