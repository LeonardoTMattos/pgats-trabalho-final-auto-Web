/// <reference types="cypress" />

// Trabalho de Conclusão — casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 de https://automationexercise.com/test_cases
const menu = require('../modules/menu')
const cadastro = require('../modules/cadastro')
const login = require('../modules/login')
const conta = require('../modules/conta')
const produtos = require('../modules/produtos')
const carrinho = require('../modules/carrinho')
const checkout = require('../modules/checkout')
const newsletter = require('../modules/newsletter')
const { gerarUsuario, gerarEmailUnico } = require('../modules/common')
const pagamento = require('../fixtures/pagamento.json')

describe('Automation Exercise - Trabalho Final', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()
  })

  // Garante que nenhuma conta criada pelos testes fique para trás, mesmo se o teste falhar
  afterEach(() => {
    conta.excluirContaViaApi(usuario)
  })

  context('Cadastro e login', () => {
    it('TC1 - Cadastrar usuário', () => {
      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')

      cadastro.iniciarCadastro(usuario.nome, usuario.email)
      cadastro.verificarFormularioDeInformacoesDaConta()
      cadastro.preencherCadastro(usuario)
      cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
      menu.verificarUsuarioLogado(usuario.nome)

      menu.excluirConta()
      conta.verificarContaExcluida()
    })

    it('TC2 - Login com e-mail e senha corretos', () => {
      conta.criarContaViaApi(usuario)

      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')
      login.fazerLogin(usuario.email, usuario.senha)
      menu.verificarUsuarioLogado(usuario.nome)

      menu.excluirConta()
      conta.verificarContaExcluida()
    })

    it('TC3 - Login com e-mail e senha incorretos', () => {
      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')
      login.fazerLogin(gerarEmailUnico('nao-cadastrado'), 'senhaIncorreta')
      login.verificarErroDeLoginInvalido()
    })

    it('TC4 - Logout de usuário', () => {
      conta.criarContaViaApi(usuario)

      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')
      login.fazerLogin(usuario.email, usuario.senha)
      menu.verificarUsuarioLogado(usuario.nome)

      menu.fazerLogout()
      login.verificarPaginaDeLogin()
    })

    it('TC5 - Cadastrar usuário com e-mail já existente', () => {
      conta.criarContaViaApi(usuario)

      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')
      cadastro.iniciarCadastro(usuario.nome, usuario.email)
      cadastro.verificarErroDeEmailJaCadastrado()
    })
  })

  context('Produtos e newsletter', () => {
    it('TC8 - Verificar todos os produtos e o detalhe de um produto', () => {
      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('produtos')
      produtos.verificarPaginaDeTodosOsProdutos()

      produtos.abrirDetalheDoPrimeiroProduto()
      produtos.verificarDetalheDoProduto()
    })

    it('TC9 - Pesquisar produto', () => {
      const termo = 'Jeans'

      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('produtos')
      produtos.verificarPaginaDeTodosOsProdutos()

      produtos.buscarProduto(termo)
      produtos.verificarResultadoDaBusca(termo)
    })

    it('TC10 - Verificar inscrição na newsletter pelo rodapé da home', () => {
      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      newsletter.inscreverNaNewsletter(usuario.email)
      newsletter.verificarInscricaoComSucesso()
    })
  })

  context('Compra', () => {
    it('TC15 - Fazer pedido: cadastrar antes do checkout', () => {
      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')
      cadastro.cadastrarUsuario(usuario)
      menu.verificarUsuarioLogado(usuario.nome)

      produtos.adicionarProdutoAoCarrinho(0)
      produtos.adicionarProdutoAoCarrinho(1)
      menu.navegarPara('carrinho')
      carrinho.verificarPaginaDoCarrinho(2)
      carrinho.prosseguirParaCheckout()

      checkout.verificarEnderecoERevisaoDoPedido(usuario, 2)
      checkout.fazerPedido('Pedido do TC15 - entregar em horário comercial.')
      checkout.pagarPedido(pagamento)
      checkout.verificarPedidoConfirmado()

      menu.excluirConta()
      conta.verificarContaExcluida()
    })

    it('TC16 - Fazer pedido: login antes do checkout', () => {
      conta.criarContaViaApi(usuario)

      menu.acessarPaginaInicial()
      menu.verificarPaginaInicial()
      menu.navegarPara('login')
      login.fazerLogin(usuario.email, usuario.senha)
      menu.verificarUsuarioLogado(usuario.nome)

      produtos.adicionarProdutoAoCarrinho(0)
      menu.navegarPara('carrinho')
      carrinho.verificarPaginaDoCarrinho(1)
      carrinho.prosseguirParaCheckout()

      checkout.verificarEnderecoERevisaoDoPedido(usuario, 1)
      checkout.fazerPedido('Pedido do TC16 - entregar em horário comercial.')
      checkout.pagarPedido(pagamento)
      checkout.verificarPedidoConfirmado()

      menu.excluirConta()
      conta.verificarContaExcluida()
    })
  })
})
