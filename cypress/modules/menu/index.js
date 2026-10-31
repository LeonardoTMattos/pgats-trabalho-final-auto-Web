const seletores = {
  menuSuperior: '.shop-menu',
  linkLoginCadastro: 'a[href="/login"]',
  linkProdutos: 'a[href="/products"]',
  linkCarrinho: 'a[href="/view_cart"]',
  linkLogout: 'a[href="/logout"]',
  linkExcluirConta: 'a[href="/delete_account"]',
  usuarioLogado: '.shop-menu a > b',
}

const linksDoMenu = {
  login: seletores.linkLoginCadastro,
  produtos: seletores.linkProdutos,
  carrinho: seletores.linkCarrinho,
}

function acessarPaginaInicial() {
  cy.visit('/')
}

function verificarPaginaInicial() {
  cy.title().should('eq', 'Automation Exercise')
  cy.get('#slider').should('be.visible')
}

// menu: 'login' | 'produtos' | 'carrinho'
function navegarPara(menu) {
  const link = linksDoMenu[menu]
  if (!link) {
    throw new Error(`Menu "${menu}" inválido. Use: ${Object.keys(linksDoMenu).join(', ')}`)
  }
  cy.get(seletores.menuSuperior).find(link).click()
}

function verificarUsuarioLogado(nome) {
  cy.get(seletores.usuarioLogado).should('be.visible').and('have.text', nome)
}

function fazerLogout() {
  cy.get(seletores.linkLogout).click()
  cy.get(seletores.linkLogout).should('not.exist')
}

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click()
}

module.exports = { acessarPaginaInicial, verificarPaginaInicial, navegarPara, verificarUsuarioLogado, fazerLogout, excluirConta }
