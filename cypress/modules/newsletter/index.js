const seletores = {
  rodape: '#footer',
  titulo: '#footer .single-widget h2',
  email: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemSucesso: '#success-subscribe',
}

function inscreverNaNewsletter(email) {
  cy.get(seletores.rodape).scrollIntoView()
  cy.get(seletores.titulo).should('be.visible').and('have.text', 'Subscription')
  cy.get(seletores.email).type(email)
  cy.get(seletores.botaoInscrever).click()
}

function verificarInscricaoComSucesso() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!')
}

module.exports = { inscreverNaNewsletter, verificarInscricaoComSucesso }
