import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { preencherFormulario, validarCamposObrigatorios } from '../../helpers/formUtils';

// CENARIO 1
When("clico em Ir para o Checkout", () => {
    cy.get('#totals > .btn').click();
    cy.get('h1').should('contain', 'CHECKOUT');
    cy.location('pathname').should('include', '/checkout.html');
});
  
Then(
    'preencho o formulário de cadastro com nome {string}, sobrenome {string}, endereço {string}, numero {string}, CEP {string}, e-mail {string}',
    (nome, sobrenome, endereco, numero, cep, email) => {
      preencherFormulario({ nome, sobrenome, endereco, numero, cep, email });
    }
  );  
  
Then('finalizo a compra', () => {
    cy.get('#payment-pix').click();
    cy.get('#terms').check();
    cy.get('.btn').contains('Finalizar Pedido').click();

    cy.get('h4').should('contain', 'Obrigado pelo seu pedido Teste.');
});

// CENARIO 2
Given('que estou na página de checkout', () => {
  cy.get(':nth-child(1) > .card > .card-body > .btn').click();

  cy.acessarCarrinho();

  cy.get('#totals > .btn').click();
  cy.get('h1').should('contain', 'CHECKOUT');
  cy.location('pathname').should('include', '/checkout.html');
});

When('preencho o formulário com nome {string}, sobrenome {string}, endereço {string}, numero {string}, CEP {string}, e-mail {string}',
  (nome, sobrenome, endereco, numero, cep, email) => {
    preencherFormulario({ nome, sobrenome, endereco, numero, cep, email });
});

Then('devo ver a mensagem de erro {string}', (mensagemErro) => {
  cy.contains(mensagemErro).should('be.visible');
  cy.get('#alert-container > p').should('contain', 'Por favor, preencha todos os campos obrigatório marcados com asteriscos!');
});

When('tento finalizar o pedido', () => {
  cy.get('.btn').contains('Finalizar Pedido').click();
});

// CENARIO 3
Then('finalizo a compra sem preencher o formulário', () => {
  cy.get('.btn').click();
  cy.get('#alert-container > p').should('contain', 'Por favor, preencha todos os campos obrigatório marcados com asteriscos!');
});

When('devo ver mensagens de erro nos campos obrigatorios', () => {
  validarCamposObrigatorios();
});
