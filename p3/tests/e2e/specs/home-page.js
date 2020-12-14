describe('Home Page', () => {
    it('visits the homepage', () => {

        cy.visit('/');
        cy.contains('h2', 'Most Recent Micro Blog Posts');

        // Confirm we see at least 3 products
        cy.get('[data-test="home-post"]').its('length').should('be.gte', 3);
    })
})