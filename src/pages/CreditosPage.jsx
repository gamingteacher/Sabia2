import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function CreditosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header com navegação */}
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Voltar para o início
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Créditos e Licença
          </h1>
        </div>

        {/* Licença Creative Commons */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Licença de Uso</h2>
          <p className="text-lg text-text-dark leading-relaxed mb-4">
            O conteúdo autoral deste site – incluindo descrições, categorização, organização de informações e textos explicativos – é disponibilizado sob a licença <strong>Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional (CC BY-NC-SA 4.0)</strong>.
          </p>
          <p className="text-lg text-text-dark leading-relaxed">
            Isso significa que você pode usar, adaptar e compartilhar os conteúdos do sabIÁ para fins não comerciais, desde que atribua os créditos corretamente e mantenha a mesma licença nas versões derivadas.
          </p>
        </div>

        {/* Equipe - Grid de cartões */}
        <div className="space-y-8">
          {/* Criação e desenvolvimento conceitual */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Criação e desenvolvimento conceitual e estrutural
            </h2>
            <div className="text-center">
              <p className="text-xl font-semibold text-text-dark">
                Ronaldo Corrêa Gomes Junior
              </p>
            </div>
          </div>

          {/* Desenvolvimento e suporte */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Desenvolvimento e suporte
            </h2>
            <div className="space-y-3 text-center">
              <p className="text-xl font-semibold text-text-dark">
                Ronaldo Corrêa Gomes Junior
              </p>
              <p className="text-xl font-semibold text-text-dark">
                Carlos Henrique Rodrigues Valadares
              </p>
              <p className="text-xl font-semibold text-text-dark">
                Elaine Teixeira da Silva
              </p>
            </div>
          </div>

          {/* Curadoria */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Curadoria
            </h2>
            <div className="space-y-3 text-center">
              <p className="text-xl font-semibold text-text-dark">
                Alice Brandão Azevedo Alves
              </p>
              <p className="text-xl font-semibold text-text-dark">
                Elaine Teixeira da Silva
              </p>
              <p className="text-xl font-semibold text-text-dark">
                Ronaldo Corrêa Gomes Junior
              </p>
            </div>
          </div>
        </div>

        {/* Nota sobre marcas registradas */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Nota sobre marcas registradas</h2>
          <p className="text-lg text-text-dark leading-relaxed">
            As marcas, logotipos e nomes das ferramentas de IA listadas neste aplicativo pertencem aos seus respectivos proprietários. O sabIÁ realiza uma curadoria educativa e não possui vínculo comercial com os serviços mencionados.
          </p>
        </div>

        {/* Contato */}
        <div className="bg-primary rounded-xl p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Contato</h2>
          <a 
            href="mailto:gpdelta@gmail.com"
            className="inline-flex items-center gap-3 bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
          >
            <EnvelopeIcon className="w-6 h-6" />
            gpdelta@gmail.com
          </a>
        </div>

        {/* Navegação adicional */}
        <div className="mt-12 text-center">
          <Link 
            to="/sobre" 
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Sobre o sabIÁ
          </Link>
        </div>
      </div>
    </div>
  )
}