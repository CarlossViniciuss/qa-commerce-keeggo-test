import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before({ tags: "@web" }, () => {
  cy.visit('/');
  cy.get('.nav-link').contains('CARRINHO').click();

  limparCarrinho();

  cy.visit('/');
});

function limparCarrinho() {
  cy.get('body').then(($body) => {
    if ($body.find('#cart-list .remove-from-cart').length > 0) {
      cy.get('#cart-list .remove-from-cart').first().click();

      cy.wait(500);
      limparCarrinho();
    } else {
      cy.get('#cart-list .cart-item').should('not.exist');
    }
  });
}
