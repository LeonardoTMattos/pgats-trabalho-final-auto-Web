const seletores = {
  menuSuperior: '.shop-menu',
  linkLoginCadastro: 'a[href="/login"]',
  linkProdutos: 'a[href="/products"]',
  linkCarrinho: 'a[href="/view_cart"]',
  linkLogout: 'a[href="/logout"]',
  linkExcluirConta: 'a[href="/delete_account"]',
  usuarioLogado: '.shop-menu a > b',
}

function acessarPaginaInicial() {
  cy.visit('/')
  cy.title().should('eq', 'Automation Exercise')
  cy.get('#slider').should('be.visible')
}

// menu: 'login' | 'produtos' | 'carrinho'
function navegarPara(menu) {
  const links = {
    login: seletores.linkLoginCadastro,
    produtos: seletores.linkProdutos,
    carrinho: seletores.linkCarrinho,
  }
  cy.get(seletores.menuSuperior).find(links[menu]).click()
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

module.exports = { acessarPaginaInicial, navegarPara, verificarUsuarioLogado, fazerLogout, excluirConta }
