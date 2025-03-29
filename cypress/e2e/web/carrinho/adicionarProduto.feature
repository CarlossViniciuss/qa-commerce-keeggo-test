# language: pt

@carrinho @adicionar-produto @web
Funcionalidade: Adicionar Produto ao Carrinho

@regressao @smoke @produto-unico
Cenário: Adicionar um produto ao carrinho efetuando o checkout com sucesso
  Dado que estou na página inicial
  Quando seleciono o produto 'Moletom com capuz "Se você acha que nada é impossível..."'
  E clico em "Adicionar ao carrinho"
  Então devo ver o produto no carrinho com nome 'Moletom com capuz "Se você acha que nada é impossível..."', preço "R$59.00", quantidade "1" e total "R$59.00"
  E as informações de valores totais devem ser produto "R$59.00", frete "R$19.90" e total com frete "R$78.90"
  E finalizo o checkout com nome "Carlos", sobrenome "Vinicius", endereço "Rua Teste", número "123", CEP "12345678", email "teste@teste.com" e método "Pix"


@regressao @multiplos-produtos
Cenário: Adicionar múltiplos produtos ao carrinho 
  Dado que estou na página inicial
  Quando adiciono mais de um produto ao carrinho
  Então valido que os produtos selecionados estao no carrinho
  E as informações de cada produto devem ser exibidas corretamente

@regressao @carrinho-vazio
Cenário: Visualizar carrinho vazio
  Dado que estou na página inicial
  Quando acesso o carrinho sem adicionar produtos
  Então devo visualizar uma mensagem indicando que o carrinho está vazio

@regressao @quantidade-produto
Cenário: Tentar adicionar uma quantidade maior que 1 do mesmo produto
  Dado que estou na página inicial
  E aumento a quantidade de produtos para "5"
  Quando clico em Adicionar ao carrinho
  Então Meu carrinho deve conter a quantidade de "5" produtos

@regressao @contador-carrinho
Cenário: Validação do contador de produtos no carrinho
  Dado que estou na página inicial
  E aumento a quantidade de produtos
  Então meu o contador do carrinho deve conter a quantidade de "5" produtos

@regressao @paginação-carrinho
Cenário: Validação de paginação
  Dado que estou na página inicial
  E mudo a paginação da paginação
  Então adiciono e valido o produto ao meu carrinho
