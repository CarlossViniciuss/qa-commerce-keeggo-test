import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { calcularTotais } from '../../../helpers/carrinhoUtils';

Given('que estou na página inicial', () => {
  cy.get('h1').should('contain', 'Sua Melhor Experiência de Compra Está Aqui!');
});

// CENARIO 1
When('seleciono o produto {string}', (nomeProduto) => {
    cy.contains('.card', nomeProduto).find('.card-img-top').click();
    cy.get('legend').should('contain', nomeProduto);
});
  
When('clico em {string}', (botao) => {
    cy.get('#add-to-cart').contains(botao).click();
});
  
Then('devo ver o produto no carrinho com nome {string}, preço {string}, quantidade {string} e total {string}', 
  (nomeProduto, preco, quantidade, total) => {
  cy.acessarCarrinho();
  cy.validarProdutoCarrinho({ nome: nomeProduto, preco, quantidade, total });
});

  
Then('as informações de valores totais devem ser produto {string}, frete {string} e total com frete {string}', 
    (totalProduto, frete, totalComFrete) => {
    cy.get('#totals').within(() => {
      cy.get('#total-products').should('contain.text', `Valor total do(s) Produto(s): ${totalProduto}`);
      cy.get('#shipping-fee').should('contain.text', `Frete: ${frete}`);
      cy.get('#total-with-shipping').should('contain.text', `Valor total + Frete fixo: ${totalComFrete}`);
    });
});
  
Then('finalizo o checkout com nome {string}, sobrenome {string}, endereço {string}, número {string}, CEP {string}, email {string} e método {string}', 
  (nome, sobrenome, endereco, numero, cep, email, metodo) => {
  cy.finalizarCheckout({ nome, sobrenome, endereco, numero, cep, email, metodo });
});

// CENARIO 2
let produtosSelecionados = [];

When('adiciono mais de um produto ao carrinho', () => {
  produtosSelecionados = [];

  cy.get('#product-list .card').each(($card, index) => {
    if(index < 4) { 
      cy.wrap($card).within(() => {
        cy.get('legend a').invoke('text').then((nomeProduto) => {
          cy.get('p').contains('Preço:').invoke('text').then((precoTexto) => {
            cy.get('input[type=number]').invoke('val').then((quantidade) => {
              const preco = precoTexto.replace('Preço:', '').trim();

              produtosSelecionados.push({
                nome: nomeProduto.trim(),
                preco: preco,
                quantidade: quantidade
              });

              cy.get('.btn.add-to-cart').click();
            });
          });
        });
      });
    }
  });
});
  
Then('valido que os produtos selecionados estao no carrinho', () => {
    cy.acessarCarrinho();
  
    cy.get('#cart-list .cart-item').should('have.length', produtosSelecionados.length)
      .each(($item, index) => {
        const produtoEsperado = produtosSelecionados[index];
  
        cy.wrap($item).within(() => {
          cy.get('legend').should('have.text', produtoEsperado.nome);
          cy.get('p').eq(0).should('contain', `Preço: ${produtoEsperado.preco}`);
          cy.get('p').eq(1).should('contain', `Quantidade: ${produtoEsperado.quantidade}`);
  
          const precoNumerico = parseFloat(produtoEsperado.preco.replace('R$', '').replace(',', '.'));
          const totalProduto = (precoNumerico * Number(produtoEsperado.quantidade)).toFixed(2);
  
          cy.get('p').eq(2).should('contain', `Total: R$${totalProduto}`);
        });
      });
});

Then('as informações de cada produto devem ser exibidas corretamente', () => {
  let totais = calcularTotais(produtosSelecionados);
  
  cy.get('#total-products').should('contain', totais.totalProdutos);
  cy.get('#shipping-fee').should('contain', totais.frete);
  cy.get('#total-with-shipping').should('contain', totais.totalComFrete);
});
  

// CENARIO 3
When('acesso o carrinho sem adicionar produtos', () => {
  cy.acessarCarrinho();
});

Then('devo visualizar uma mensagem indicando que o carrinho está vazio', () => {
    cy.get('#cart-list > .text-center > p').should('contain', 'Seu carrinho está vazio.');
    cy.get('.text-center > .btn').click();
});

// CENARIO 4
Then('aumento a quantidade de produtos para {string}', (quantidadeProduto) => {
    cy.get('#quantity-1').clear().type(quantidadeProduto);
});

When('clico em Adicionar ao carrinho', () => {
    cy.get(':nth-child(1) > .card > .card-body > .btn').click();
});

Then('Meu carrinho deve conter a quantidade de {string} produtos', (quantidadeProduto) => {
    cy.acessarCarrinho();
    cy.get('.cart-item > :nth-child(3)').should('contain', `Quantidade: ${quantidadeProduto}`);
});

// CENARIO 5
When('aumento a quantidade de produtos', () => {
    cy.get('#quantity-1').clear().type("5");
    cy.get(':nth-child(1) > .card > .card-body > .btn').click();
});

Then('meu o contador do carrinho deve conter a quantidade de {string} produtos', (quantidadeProduto) => {
    cy.get('#cart-count').should('contain', quantidadeProduto);
});

// CENARIO 6
Then('mudo a paginação da paginação', () => {
    cy.get(':nth-child(3) > .page-link').click();
    cy.get(':nth-child(1) > .card > .card-body > .btn').click();
});

When('adiciono e valido o produto ao meu carrinho', () => {
    cy.acessarCarrinho();

    cy.get('legend').should('contain', 'Regata "Na minha máquina funciona"');
})