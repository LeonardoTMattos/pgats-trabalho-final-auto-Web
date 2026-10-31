const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  itensPedido: '#cart_info tbody tr[id^="product-"]',
  comentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',
  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  pedidoConfirmado: '[data-qa="order-placed"]',
}

function verificarEnderecoERevisaoDoPedido(usuario, quantidadeDeItens) {
  cy.url().should('include', '/checkout')
  cy.contains('h2', 'Address Details').should('be.visible')
  cy.get(seletores.enderecoEntrega)
    .should('contain.text', `${usuario.primeiroNome} ${usuario.sobrenome}`)
    .and('contain.text', usuario.endereco)
    .and('contain.text', usuario.cidade)
    .and('contain.text', usuario.pais)
    .and('contain.text', usuario.celular)
  cy.get(seletores.enderecoCobranca).should('contain.text', usuario.endereco)

  cy.contains('h2', 'Review Your Order').should('be.visible')
  cy.get(seletores.itensPedido).should('have.length', quantidadeDeItens)
}

function fazerPedido(comentario) {
  cy.get(seletores.comentario).type(comentario)
  cy.get(seletores.botaoFazerPedido).click()
}

function pagarPedido(pagamento) {
  cy.url().should('include', '/payment')
  cy.get(seletores.nomeNoCartao).type(pagamento.nomeNoCartao)
  cy.get(seletores.numeroCartao).type(pagamento.numeroCartao, { log: false })
  cy.get(seletores.cvc).type(pagamento.cvc, { log: false })
  cy.get(seletores.mesExpiracao).type(pagamento.mesExpiracao)
  cy.get(seletores.anoExpiracao).type(pagamento.anoExpiracao)
  cy.get(seletores.botaoPagar).click()
}

function verificarPedidoConfirmado() {
  cy.url().should('include', '/payment_done')
  cy.get(seletores.pedidoConfirmado).should('be.visible').and('have.text', 'Order Placed!')
  cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}

module.exports = { verificarEnderecoERevisaoDoPedido, fazerPedido, pagarPedido, verificarPedidoConfirmado }
