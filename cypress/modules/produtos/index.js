const seletores = {
  tituloLista: '.features_items .title',
  cardProduto: '.features_items .product-image-wrapper',
  nomeProdutoNoCard: '.productinfo p',
  linkVerProduto: 'a[href^="/product_details/"]',
  botaoAdicionarNoCard: '.productinfo .add-to-cart',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  detalhe: '.product-information',
  modalCarrinho: '#cartModal',
  botaoContinuarComprando: '#cartModal .close-modal',
}

function verificarPaginaDeTodosOsProdutos() {
  cy.url().should('include', '/products')
  cy.get(seletores.tituloLista).should('have.text', 'All Products')
  cy.get(seletores.cardProduto).should('have.length.greaterThan', 0)
}

function abrirDetalheDoPrimeiroProduto() {
  cy.get(seletores.cardProduto).first().find(seletores.linkVerProduto).click()
}

function verificarDetalheDoProduto() {
  cy.url().should('include', '/product_details/')
  cy.get(seletores.detalhe).within(() => {
    cy.get('h2').invoke('text').should('not.be.empty') // nome
    cy.contains('p', 'Category:').should('be.visible')
    cy.contains('span', 'Rs.').should('be.visible') // preço
    cy.contains('p', 'Availability:').should('be.visible')
    cy.contains('p', 'Condition:').should('be.visible')
    cy.contains('p', 'Brand:').should('be.visible')
  })
}

function buscarProduto(termo) {
  cy.get(seletores.campoBusca).type(termo)
  cy.get(seletores.botaoBusca).click()
}

function verificarResultadoDaBusca(termo) {
  cy.url().should('include', `search=${termo}`)
  cy.get(seletores.tituloLista).should('have.text', 'Searched Products')
  cy.get(seletores.cardProduto)
    .should('have.length.greaterThan', 0)
    .find(seletores.nomeProdutoNoCard)
    .each(($nome) => {
      // Todos os produtos listados devem estar relacionados ao termo buscado
      expect($nome.text()).to.match(new RegExp(termo, 'i'))
    })
}

// Adiciona o produto do índice informado e fecha o modal para continuar comprando
function adicionarProdutoAoCarrinho(indice) {
  cy.get(seletores.cardProduto).eq(indice).find(seletores.botaoAdicionarNoCard).click()
  cy.get(seletores.modalCarrinho).should('be.visible').and('contain.text', 'Your product has been added to cart.')
  cy.get(seletores.botaoContinuarComprando).click()
  cy.get(seletores.modalCarrinho).should('not.be.visible')
}

module.exports = {
  verificarPaginaDeTodosOsProdutos,
  abrirDetalheDoPrimeiroProduto,
  verificarDetalheDoProduto,
  buscarProduto,
  verificarResultadoDaBusca,
  adicionarProdutoAoCarrinho,
}
