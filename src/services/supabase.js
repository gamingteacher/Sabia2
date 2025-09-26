import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://emhabcflfiabquldgbel.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGFiY2ZsZmlhYnF1bGRnYmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODEyMTEsImV4cCI6MjA3MzU1NzIxMX0.rGlwBODlJcv7wSiVrES6QCamC1hhYXT4m54Y_yeG-og'

// Cliente Supabase com autenticação
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tabelas
export const tableNames = {
  FERRAMENTAS: 'ferramentas',
  CATEGORIAS: 'categorias',
  SOLICITACOES: 'solicitacoes_acesso',
  EQUIPE: 'equipe'
}

// Serviços de autenticação
export const authService = {
  // Login com email e senha
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Cadastro de novo usuário
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Obter dados do usuário na tabela equipe
  async getUserTeamData(email) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .select('*')
      .eq('email', email)
      .single()
    
    return { data, error }
  },

  // Criar ou atualizar dados do usuário na tabela equipe
  async upsertUserTeamData(userData) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .upsert(userData, { onConflict: 'email' })
      .select()
      .single()
    
    return { data, error }
  }
}

// Serviço de dados
export const supabaseService = {
  supabase,
  
  // Métodos básicos para CRUD
  async fetchFerramentas() {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .select('*')
      .order('nome', { ascending: true })
    
    if (error) throw error
    return data
  },
  
  async fetchFerramenta(id) {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },
  
  async fetchCategorias() {
    const { data, error } = await supabase
      .from(tableNames.CATEGORIAS)
      .select('*')
      .order('nome', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Métodos para gerenciamento de equipe
  async fetchEquipe() {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateUserRole(userId, papel) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .update({ papel, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  }
}