# PGATS - Trabalho de Conclusão: Automação Web com Cypress

Trabalho de conclusão da disciplina **Automação de Testes na Camada de Interface (Web)** — PGATS.
Implementa os casos de teste da página [Test Cases](https://automationexercise.com/test_cases) do **Automation Exercise**.

| Caso | Descrição |
|---|---|
| TC1 | Cadastrar usuário |
| TC2 | Login com e-mail e senha corretos |
| TC3 | Login com e-mail e senha incorretos |
| TC4 | Logout de usuário |
| TC5 | Cadastrar usuário com e-mail já existente |
| TC8 | Verificar todos os produtos e o detalhe de um produto |
| TC9 | Pesquisar produto |
| TC10 | Verificar inscrição na newsletter (rodapé da home) |
| TC15 | Fazer pedido: cadastrar antes do checkout |
| TC16 | Fazer pedido: login antes do checkout |

## Estrutura

```
cypress/
  e2e/trabalho-final.cy.js     # spec com os 10 casos de teste
  fixtures/                    # massa de dados (usuário e pagamento)
  modules/                     # funções reutilizáveis por funcionalidade
    menu/  cadastro/  login/  conta/  produtos/  carrinho/  checkout/  newsletter/  common/
  support/e2e.js               # registro do relatório mochawesome
cypress.config.js              # baseUrl, retries, bloqueio de anúncios, reporter
.github/workflows/cypress.yml  # pipeline do GitHub Actions
```

### Decisões técnicas
- **Modularização**: cada funcionalidade em `cypress/modules/<funcionalidade>/index.js`, com seletores em uma constante `seletores` perto das ações, funções em português e asserções dentro dos módulos.
- **Seletores**: prioridade para `data-qa`, depois `id` e atributos estáveis (`href`); sem seletores posicionais gerados automaticamente.
- **Testes independentes**: cada teste gera um e-mail único. Quando o cenário precisa de uma conta existente (TC2, TC4, TC5 e TC16), ela é criada via **API** (`/api/createAccount`), e um `afterEach` remove a conta via API ao final.
- **Estabilidade**: `baseUrl`, `blockHosts` para anúncios do Google (que abrem pop-ups no site) e `retries` de 1 tentativa no modo `run`.

## Como executar

Requisitos: Node.js >= 22.

```bash
npm install
npm run cy:open   # modo interativo
npm test          # headless, gera o relatório em cypress/reports/index.html
```

## Pipeline e relatório

O workflow **Testes E2E - Cypress** roda a cada push na `main`, em pull requests ou manualmente (*Actions → Run workflow*).
Ao final, o relatório HTML do mochawesome fica disponível para download como artefato **relatorio-cypress** na página da execução.
Os screenshots das falhas já vão embutidos no relatório. No CI a execução também é gravada em vídeo, publicado como artefato **video-cypress** apenas quando algum teste falha.
