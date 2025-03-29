# language: pt

@api @post @login
Funcionalidade: Autenticação de usuários

@regressao @smoke @sucess
Cenário: Login bem-sucedido com credenciais válidas
  Quando realizo uma requisição POST para "/api/login" com email e senhas válidos
  Então o status da resposta deve ser 200
  E a resposta deve conter o token e dados do usuário

@regressao @erro
Cenário: Login com credenciais inválidas
  Quando realizo uma requisição POST para "/api/login" com email e senhas invalidos
  Então o status da resposta deve ser 401
  E a mensagem de erro deve ser "Email ou senha incorretos."

  @erro @validacoes
Esquema do Cenário: Login com dados ausentes ou inválidos
  Quando realizo uma requisição POST para "/api/login" com o corpo:
    """
    <body>
    """
  Então o status da resposta deve ser <status>
  E a mensagem de erro deve ser "<mensagem>"

  Exemplos:
    | body                                                                 | status | mensagem                    |
    | { "password": "senha123" }                                           | 401    | Email ou senha incorretos.  |
    | { "email": "teste@teste.com" }                                       | 401    | Email ou senha incorretos.  |
    | { }                                                                  | 401    | Email ou senha incorretos.  |
    | { "email": 123, "password": true }                                   | 401    | Email ou senha incorretos.  |
    | { "email": "teste@teste.com", "password": "senhaErrada" }            | 401    | Email ou senha incorretos.  |
