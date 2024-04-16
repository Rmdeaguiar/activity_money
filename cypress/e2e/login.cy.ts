describe('Tests the Login page', () => {

  it('should go to Signup page when clicks on "Ainda não tem cadastro? Clique aqui"', () => {
    cy.visit('/');

    cy.contains('Ainda não tem cadastro? Clique aqui').click();
    cy.contains('Cadastre-se');
  })


  it('should go to Home page when types credentials and clicks on Confirmar', () => {
    cy.visit('/');

    cy.get('[data-testid=input-username]').type("rafael");
    cy.get('[data-testid=input-password]').type("123456");

    cy.intercept('POST', 'http://localhost:8000/login', {
      fixture: 'login-response.json'
    })

    cy.intercept('GET', 'http://localhost:8000/transactions', {
      fixture: 'home-incomes'
    })

    cy.contains('Confirmar').click();
    cy.contains('Seja bem vindo');
    cy.contains('Entradas');
    cy.contains('Saídas');
    cy.contains('Total');
  })
})

