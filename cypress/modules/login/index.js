const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: 'form[action="/login"] p',
}

function verificarPaginaDeLogin() {
  cy.url().should('include', '/login')
  cy.get(seletores.tituloLogin).should('be.visible').and('have.text', 'Login to your account')
}

function fazerLogin(email, senha) {
  verificarPaginaDeLogin()
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha, { log: false })
  cy.get(seletores.botaoLogin).click()
}

function verificarErroDeLoginInvalido() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Your email or password is incorrect!')
}

module.exports = { verificarPaginaDeLogin, fazerLogin, verificarErroDeLoginInvalido }
