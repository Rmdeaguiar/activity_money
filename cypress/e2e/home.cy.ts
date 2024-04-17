describe('Tests the Home page', () => {

    it('should show Home page items', () => {

        cy.window().then((window) => {
            window.localStorage.setItem('token', 'fakeToken');
        });

        cy.intercept('GET', 'http://localhost:8000/transactions', {
            fixture: 'home-incomes'
        })

        cy.visit('/home');
        cy.contains('Seja bem vindo');
        cy.contains('Entradas');
        cy.contains('Saídas');
        cy.contains('Total');
        cy.contains('Título');
        cy.contains('Valor');
        cy.contains('Data');

        cy.contains('Nova transação');
        cy.contains('Sair');
    });

    it('should open a modal for transactions when clicks on "Nova transação"', () => {

        cy.window().then((window) => {
            window.localStorage.setItem('token', 'fakeToken');
        });

         cy.intercept('GET', 'http://localhost:8000/transactions', {
           fixture: 'home-incomes'
         })

        cy.visit('/home');
        cy.contains('Nova transação').click();
        cy.contains('Entrada');
        cy.contains('Saída');
        cy.contains('Confirmar');
        cy.contains('Cancelar');
    });

    it('should go back to Login page when clicks on "Sair"', () => {
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

        cy.contains('Sair').click();
        cy.contains('Login');
    })

})

