describe('Blog Page', () => {

    // Define a post we can use
    let post = {
        title: 'Second Blog Post',
        id: 2
    }

    let comment = {
        long: 'This comment is too long as it contains more than 200 characters and \
        should throw a client side error message thanks to the validator rules we have \
        set in validatorjs. The perfect comment is between 1-200 characters inclusive.',
        perfectAnon: 'Anonymous comment...',
        perfectAuth: 'Auth comment...'
    }

    it('shows a post', () => {
        cy.visit('/all/' + post.id);
        cy.contains('[data-test="post-title"]', post.title);
    })

    it('shows the comments', () => {
        cy.visit('/all/' + post.id);

        // Confirm we see the comment submission form
        cy.contains('[data-test="comment-form"]', 'Submit a comment');

        // Confirm we see at least 2 comments
        cy.get('[data-test="comment-username"]').its('length').should('be.gte', 2);
    })

    it('makes an anonymous comment', () => {
        cy.visit('/all/' + post.id);

        // Make an anonymous comment
        cy.contains('h5', 'User: Anonymous')
        cy.get('[data-test=comment-body-submit]').clear().type(comment.long);
        cy.get('[data-test="post-title"]').click();
        cy.contains('The comment may not be greater than 200 characters.');
        cy.get('[data-test=comment-body-submit]').clear().type(comment.perfectAnon);
        cy.get('[data-test=comment-submit]').click();
        cy.contains('h3', 'Success!');
        cy.wait(500);
        cy.contains('[data-test="comment-username"]', 'Anonymous');
        cy.contains('[data-test="comment-body"]', comment.perfectAnon);
    })

    it('makes an auth comment', () => {
        cy.login();
        cy.visit('/all/' + post.id);

        // Make an auth comment
        cy.contains('h5', 'User: Jill Harvard');
        cy.get('[data-test=comment-body-submit]').clear().type(comment.long);
        cy.get('[data-test="post-title"]').click();
        cy.contains('The comment may not be greater than 200 characters.');
        cy.get('[data-test=comment-body-submit]').clear().type(comment.perfectAuth);
        cy.get('[data-test=comment-submit]').click();
        cy.contains('h3', 'Success!');
        cy.wait(500);
        cy.contains('[data-test="comment-username"]', 'Jill Harvard');
        cy.contains('[data-test="comment-body"]', comment.perfectAuth);
    })
})