const seletores = {
  tituloNovoUsuario: '.signup-form h2',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  mensagemErroSignup: 'form[action="/signup"] p',
  tituloInformacoesConta: '.login-form h2',
  generoMasculino: '#id_gender1',
  generoFeminino: '#id_gender2',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  endereco2: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.tituloNovoUsuario).should('have.text', 'New User Signup!')
  cy.get(seletores.nome).type(nome)
  cy.get(seletores.email).type(email)
  cy.get(seletores.botaoSignup).click()
}

function preencherCadastro(usuario) {
  cy.get(seletores.tituloInformacoesConta).first().should('have.text', 'Enter Account Information')

  cy.get(usuario.titulo === 'Mrs' ? seletores.generoFeminino : seletores.generoMasculino).check()
  cy.get(seletores.senha).type(usuario.senha, { log: false })
  cy.get(seletores.dia).select(usuario.dia)
  cy.get(seletores.mes).select(usuario.mes)
  cy.get(seletores.ano).select(usuario.ano)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.ofertas).check()

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome)
  cy.get(seletores.sobrenome).type(usuario.sobrenome)
  cy.get(seletores.empresa).type(usuario.empresa)
  cy.get(seletores.endereco).type(usuario.endereco)
  cy.get(seletores.endereco2).type(usuario.endereco2)
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.estado).type(usuario.estado)
  cy.get(seletores.cidade).type(usuario.cidade)
  cy.get(seletores.cep).type(usuario.cep)
  cy.get(seletores.celular).type(usuario.celular)

  cy.get(seletores.botaoCriarConta).click()
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
  cy.url().should('include', '/account_created')
  cy.get(seletores.contaCriada).should('be.visible').and('have.text', 'Account Created!')
  cy.get(seletores.botaoContinuar).click()
}

function verificarErroDeEmailJaCadastrado() {
  cy.get(seletores.mensagemErroSignup)
    .should('be.visible')
    .and('have.text', 'Email Address already exist!')
}

// Fluxo completo de cadastro pela interface (usado no TC1 e no TC15)
function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario.nome, usuario.email)
  preencherCadastro(usuario)
  verificarSeCadastroFoiEfetuadoComSucesso()
}

module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarErroDeEmailJaCadastrado,
  cadastrarUsuario,
}
