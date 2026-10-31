const dadosUsuario = require('../../fixtures/usuario.json')

// Gera um e-mail único por execução para evitar conflito de cadastro
function gerarEmailUnico(prefixo = 'qa-tester') {
  return `${prefixo}-${Date.now()}-${Cypress._.random(1000, 9999)}@test.com`
}

// Monta um usuário novo a partir da fixture, trocando apenas o e-mail
function gerarUsuario() {
  return { ...dadosUsuario, email: gerarEmailUnico() }
}

module.exports = { gerarEmailUnico, gerarUsuario }
