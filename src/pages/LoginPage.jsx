import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores'

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
    instituicao: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { 
    login, 
    register, 
    isLoading, 
    isAuthenticated,
    hasToolAccess 
  } = useAuthStore()

  // Se já está autenticado e tem acesso, redirecionar
  if (isAuthenticated && hasToolAccess()) {
    return <Navigate to="/painel" replace />
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.email || !formData.password) {
      setError('Email e senha são obrigatórios')
      return
    }

    let result
    if (isLoginMode) {
      result = await login(formData.email, formData.password)
    } else {
      if (!formData.nome) {
        setError('Nome é obrigatório para cadastro')
        return
      }
      result = await register(formData.email, formData.password, {
        nome: formData.nome,
        instituicao: formData.instituicao
      })
    }

    if (result.success) {
      if (isLoginMode) {
        setSuccess('Login realizado com sucesso!')
      } else {
        setSuccess('Cadastro realizado! Aguarde aprovação da equipe.')
      }
      // Reset form
      setFormData({ email: '', password: '', nome: '', instituicao: '' })
    } else {
      setError(result.error || 'Erro desconhecido')
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setFormData({ email: '', password: '', nome: '', instituicao: '' })
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Sabiá
          </h1>
          <p className="text-gray-600">
            {isLoginMode ? 'Faça login em sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome (apenas no cadastro) */}
            {!isLoginMode && (
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Seu nome completo"
                  required={!isLoginMode}
                />
              </div>
            )}

            {/* Campo Instituição (apenas no cadastro) */}
            {!isLoginMode && (
              <div>
                <label htmlFor="instituicao" className="block text-sm font-medium text-gray-700 mb-2">
                  Instituição (opcional)
                </label>
                <input
                  type="text"
                  id="instituicao"
                  name="instituicao"
                  value={formData.instituicao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Sua instituição"
                />
              </div>
            )}

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
              {!isLoginMode && (
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo de 6 caracteres
                </p>
              )}
            </div>

            {/* Mensagens de erro/sucesso */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Botão de submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLoginMode ? 'Entrando...' : 'Cadastrando...'}
                </div>
              ) : (
                isLoginMode ? 'Entrar' : 'Criar conta'
              )}
            </button>
          </form>

          {/* Toggle entre login e cadastro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {isLoginMode ? 'Criar conta' : 'Fazer login'}
              </button>
            </p>
          </div>

          {/* Informação sobre aprovação */}
          {!isLoginMode && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                ℹ️ Novos usuários precisam de aprovação da equipe para acessar o painel de ferramentas.
              </p>
            </div>
          )}
        </div>

        {/* Voltar ao site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage