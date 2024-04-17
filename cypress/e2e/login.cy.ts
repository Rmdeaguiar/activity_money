describe('Tests the Login page', () => {

  it('should appear a message error if an input is empty', () => {
    cy.visit('/');

    cy.contains('Confirmar').click();
    cy.contains('Todos os campos são obrigatórios');
  })

  it('should go to Signup page when clicks on "Ainda não tem cadastro? Clique aqui", and then back to Login when clicks on "Já tem cadastro? Clique aqui"', () => {
    cy.visit('/');

    cy.contains('Ainda não tem cadastro? Clique aqui').click();
    cy.contains('Cadastre-se');
    cy.contains('Já tem cadastro? Clique aqui').click();
    cy.contains('Login');
  })

  it('should go to Login page after type in the two inputs to Sign Up and confirm', () => {
    cy.visit('/');

    cy.contains('Ainda não tem cadastro? Clique aqui').click();
    cy.contains('Cadastre-se');
    cy.get('[data-testid=input-username]').type("joao");
    cy.get('[data-testid=input-password]').type("123456");

    cy.intercept('POST', 'http://localhost:8000/signup', {
      fixture: 'signup-response.json'
    })

    cy.contains('Confirmar').click();
    cy.contains('Login');
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

