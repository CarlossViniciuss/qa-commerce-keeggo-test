export function criarUsuarioSeNaoExistir({ name, email, password }) {
    return cy.api({
      method: 'POST',
      url: 'http://localhost:3000/api/users',
      body: {
        name,
        email,
        password,
        isAdmin: false
      },
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((res) => {
      if (res.status === 400 && res.body.message === 'Email já cadastrado.') {
        cy.log('Usuário já cadastrado.');
      } else if (res.status === 201 || res.status === 200) {
        cy.log('Usuário criado.');
      } else {
        cy.log(`Erro inesperado: ${res.status}`);
      }
    });
  }
  