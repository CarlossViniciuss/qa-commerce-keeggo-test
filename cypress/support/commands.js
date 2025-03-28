Cypress.Commands.add('acessarCarrinho', () => {
    cy.get('.nav-link').contains('CARRINHO').click();
    cy.location('pathname').should('include', '/cart.html');
    cy.get('h1').should('contain', 'SEU CARRINHO');
});
  
Cypress.Commands.add('validarProdutoCarrinho', (produto) => {
    cy.get('.cart-item').within(() => {
        cy.get('legend').should('have.text', produto.nome);
        cy.get('p').eq(0).should('contain.text', `Preço: ${produto.preco}`);
        cy.get('p').eq(1).should('contain.text', `Quantidade: ${produto.quantidade}`);
        cy.get('p').eq(2).should('contain.text', `Total: ${produto.total}`);
    });
});
  
Cypress.Commands.add('finalizarCheckout', (dados) => {
    cy.get('#totals .btn').contains('Ir para o Checkout').click();
    cy.get('#first-name').type(dados.nome);
    cy.get('#last-name').type(dados.sobrenome);
    cy.get('#address').type(dados.endereco);
    cy.get('#number').type(dados.numero);
    cy.get('#cep').type(dados.cep);
    cy.get('#email').type(dados.email);
  
    cy.get(`#payment-${dados.metodo.toLowerCase()}`).click();
    cy.get('#terms').click();
    cy.get('.btn').contains('Finalizar Pedido').click();
    cy.get('h1').should('contain', 'STATUS DO PEDIDO');
    cy.get('h4').should('contain', `Obrigado pelo seu pedido ${dados.nome}`);
});
  