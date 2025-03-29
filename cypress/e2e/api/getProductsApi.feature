# language: pt

@api @get @produtos
Funcionalidade: Consultar produtos

@regressao
Cenário: Buscar todos os produtos com sucesso
  Quando realizo uma requisição GET para "/api/produtos"
  Então o status da resposta deve ser 200
  E a lista de produtos deve conter pelo menos 1 item
  E os produtos devem conter os campos obrigatórios
