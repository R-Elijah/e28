describe('Subscription Page', () => {

    // Define a post we can use
    let post = {
        title: 'Final test for the blog?',
        id: 6
    }

    it('shows login message when not logged in', () => {
        cy.visit('/subscriptions');
        cy.contains('p', 'You need to be logged in to view your subscriptions. Log in on the account page.');

    })

    it('shows all the subbed posts', () => {
        cy.login();
        cy.visit('/subscriptions');
        cy.contains('h2', 'Your Subscriptions');

        // Confirm we see at least 2 posts
        cy.get('[data-test="post-title"]').its('length').should('be.gte', 2);

        // Confirm we see our test post
        cy.contains('[data-test="post-title"]', post.title);

        // Confirm we can click on a post and get to its individual page
        cy.get('[data-test="post-title"]').contains(post.title).click();

        // Confirm the test post page loads
        cy.contains('[data-test="post-title"]', post.title);
        cy.url().should('include', post.id);

    })
})