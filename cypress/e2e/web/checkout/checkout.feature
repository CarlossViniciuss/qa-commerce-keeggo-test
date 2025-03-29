# language: pt

@checkout @web 
Funcionalidade: Validar Checkout  

@regressao @simple-checkout
Cenário: Validar funcionamento do checkout
  Dado que estou na página inicial
  E seleciono o produto 'Moletom com capuz "Se você acha que nada é impossível..."'
  E clico em "Adicionar ao carrinho"
  E devo ver o produto no carrinho com nome 'Moletom com capuz "Se você acha que nada é impossível..."', preço "R$59.00", quantidade "1" e total "R$59.00"
  Quando clico em Ir para o Checkout
  E preencho o formulário de cadastro com nome "Teste", sobrenome "Teste", endereço "Rua teste", numero "123", CEP "11330543", e-mail "teste@teste.com"
  Então finalizo a compra

@regressao @error-checkout
Esquema do Cenário: Validar mensagens de erro para campos de CEP e e-mail inválidos
  Dado que estou na página de checkout
  Quando preencho o formulário com nome "Teste", sobrenome "Teste", endereço "Rua Teste", numero "123", CEP "<cep>", e-mail "<email>"
  E tento finalizar o pedido
  Então devo ver a mensagem de erro "<mensagemErro>"

  Exemplos:
    | cep        | email              | mensagemErro                         |
    | 1234567    | teste@teste.com    | O CEP deve ter 8 caracteres.         |
    | 12345678   | teste.com          | Por favor, insira um email válido.   |

@regressao @error-messages
Cenário: Validar mensagens de erro em campos obrigatórios
  Dado que estou na página de checkout
  E finalizo a compra sem preencher o formulário
  Então devo ver mensagens de erro nos campos obrigatorios