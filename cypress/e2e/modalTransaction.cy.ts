describe('Tests the Modal Transaction component', () => {

    it('should show the new Modal Transaction', () => {

        cy.window().then((window) => {
            window.localStorage.setItem('token', 'fakeToken');
        });

        cy.intercept('GET', 'http://localhost:8000/transactions', {
            fixture: 'home-incomes'
        })
        cy.visit('/home');

        cy.contains('Nova transação').click();

        cy.intercept('POST', 'http://localhost:8000/transaction', {
            fixture: 'new-transaction.json'
        })

        cy.get('[data-testid=input-title]').type("Salário");
        cy.get('[data-testid=input-value]').clear().type('15000')
        cy.get('[data-testid=input-date]').type("2023-04-03");
        cy.get('[data-testid=input-entry]').check();
        cy.contains('Confirmar').click();
        
    });
})

