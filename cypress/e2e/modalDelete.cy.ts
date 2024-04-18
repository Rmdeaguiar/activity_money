describe('Tests the Modal Delete component', () => {

    it('should show the Modal Delete', () => {
        cy.window().then((window) => {
            window.localStorage.setItem('token', 'fakeToken');
        });

        cy.intercept('GET', 'http://localhost:8000/transactions', {
            fixture: 'home-incomes'
        })
        cy.visit('/home');

        cy.get('[data-testid=modal-delete]').first().click();
        cy.contains('Tem certeza que deseja excluir esta transação?');
    });
})

