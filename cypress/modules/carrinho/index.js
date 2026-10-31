const seletores = {
  itensCarrinho: '#cart_info_table tbody tr',
  botaoProsseguir: '#do_action .check_out',
}

function verificarPaginaDoCarrinho(quantidadeDeItens) {
  cy.url().should('include', '/view_cart')
  cy.get(seletores.itensCarrinho).should('have.length', quantidadeDeItens)
}

function prosseguirParaCheckout() {
  cy.get(seletores.botaoProsseguir).click()
}

module.exports = { verificarPaginaDoCarrinho, prosseguirParaCheckout }
