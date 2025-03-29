import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

import { criarUsuarioSeNaoExistir } from '../../helpers/authUtils';

When('realizo uma requisição POST para {string} com email e senhas válidos', (endpoint) => {
  criarUsuarioSeNaoExistir({
    name: 'Teste Carlão',
    email: 'teste@teste.com',
    password: 'senha123'
  }).then(() => {
    cy.api({
      method: 'POST',
      url: `http://localhost:3000${endpoint}`,
      body: {
        email: 'teste@teste.com',
        password: 'senha123'
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).as('response');
  });
});

When('realizo uma requisição POST para {string} com email e senhas invalidos', (endpoint) => {
    cy.api({
      method: 'POST',
      url: `http://localhost:3000${endpoint}`,
      body: {
        email: 'teste@erro.com',
        password: '.'
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).as('response');
});

Then('a resposta deve conter o token e dados do usuário', () => {
  cy.get('@response').then((res) => {
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('token');
  });
});

Then('a mensagem de erro deve ser {string}', (mensagemEsperada) => {
  cy.get('@response').then((res) => {
    expect(res.body.message).to.eq(mensagemEsperada);
  });
});


When('realizo uma requisição POST para {string} com o corpo:', (endpoint, bodyString) => {
  const body = JSON.parse(bodyString);

  cy.api({
    method: 'POST',
    url: `http://localhost:3000${endpoint}`,
    body,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  }).as('response');
});
