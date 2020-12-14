describe('Blogs Page', () => {

    // Define a post we can use
    let post = {
        title: 'Second Blog Post',
        id: 2
    }

    it('shows all the posts', () => {
        cy.visit('/all');
        cy.contains('h2', 'All Micro Blog Posts');

        // Confirm we see at least 6 posts
        cy.get('[data-test="post-title"]').its('length').should('be.gte', 6);

        // Confirm we see our test post
        cy.contains('[data-test="post-title"]', post.title);

        // Confirm we can click on a post and get to its individual page
        cy.get('[data-test="post-title"]').contains(post.title).click();

        // Confirm the test post page loads
        cy.contains('[data-test="post-title"]', post.title);
        cy.url().should('include', post.id);

    })
})