import { createClient } from '@supabase/supabase-js'

// Substitua essas variáveis pelas suas configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos das tabelas do banco de dados
export const tableNames = {
  EQUIPE: 'equipe',
  FERRAMENTAS: 'ferramentas',
  PAGINAS_RELACIONADAS: 'paginas_relacionadas'
}

// Funções auxiliares para interação com as tabelas
export const supabaseService = {
  // Funções para tabela de ferramentas
  async getFerramentas() {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getFerramentaById(id) {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createFerramenta(ferramenta) {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .insert([ferramenta])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateFerramenta(id, updates) {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteFerramenta(id) {
    const { error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Funções para páginas relacionadas
  async getPaginasRelacionadas(ferramentaId = null) {
    let query = supabase
      .from(tableNames.PAGINAS_RELACIONADAS)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (ferramentaId) {
      query = query.eq('ferramenta_id', ferramentaId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  async getPaginaRelacionadaById(id) {
    const { data, error } = await supabase
      .from(tableNames.PAGINAS_RELACIONADAS)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createPaginaRelacionada(pagina) {
    const { data, error } = await supabase
      .from(tableNames.PAGINAS_RELACIONADAS)
      .insert([pagina])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updatePaginaRelacionada(id, updates) {
    const { data, error } = await supabase
      .from(tableNames.PAGINAS_RELACIONADAS)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deletePaginaRelacionada(id) {
    const { error } = await supabase
      .from(tableNames.PAGINAS_RELACIONADAS)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Funções de autenticação
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Verificar se usuário é admin
  async isUserAdmin(userId) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .select('is_admin')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data?.is_admin || false
  }
}