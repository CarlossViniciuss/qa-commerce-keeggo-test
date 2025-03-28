export function preencherFormulario({ nome, sobrenome, endereco, numero, cep, email }) {
    cy.get('#first-name').clear().type(nome);
    cy.get('#last-name').clear().type(sobrenome);
    cy.get('#address').clear().type(endereco);
    cy.get('#number').clear().type(numero);
    cy.get('#cep').clear().type(cep);
    cy.get('#email').clear().type(email);
}

export function validarCamposObrigatorios() {
    const mensagens = [
      ':nth-child(2) > .invalid-feedback',
      ':nth-child(3) > .invalid-feedback',
      ':nth-child(4) > .invalid-feedback',
      ':nth-child(5) > .invalid-feedback',
      ':nth-child(6) > .invalid-feedback',
      ':nth-child(8) > .invalid-feedback',
      '.form-group.form-check > .invalid-feedback',
    ];
  
    mensagens.forEach((seletor) => {
      cy.get(seletor).should('contain', 'Este campo é obrigatório.');
    });
}
  
  