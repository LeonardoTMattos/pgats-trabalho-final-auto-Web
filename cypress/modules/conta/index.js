// Pré-condições via API: cria/remove contas sem passar pela interface,
// deixando cada teste independente e mais rápido.
const seletores = {
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
}

function criarContaViaApi(usuario) {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.titulo,
      birth_date: usuario.dia,
      birth_month: usuario.mes,
      birth_year: usuario.ano,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.endereco2,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular,
    },
  }).then(({ body }) => {
    // A API sempre responde HTTP 200; o status real vem dentro do corpo
    expect(JSON.parse(body).responseCode).to.eq(201)
  })
}

// Limpeza: falha silenciosa caso a conta já tenha sido excluída pela interface
function excluirContaViaApi(usuario) {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.senha },
    failOnStatusCode: false,
  })
}

function verificarContaExcluida() {
  cy.url().should('include', '/delete_account')
  cy.get(seletores.contaExcluida).should('be.visible').and('have.text', 'Account Deleted!')
  cy.get(seletores.botaoContinuar).click()
}

module.exports = { criarContaViaApi, excluirContaViaApi, verificarContaExcluida }
