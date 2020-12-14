describe('Submit Page', () => {

    // Define posts we can use
    let postAnon = {
        long: 'This title is over 50 characters and will not be allowed',
        perfect: 'E2E Blog Post Anon',
        body: 'This is a test post for the E2E system.',
        id: 7
    }

    let postAuth = {
        long: 'This title is over 50 characters and will not be allowed',
        perfect: 'E2E Blog Post Auth',
        body: 'This is a test post for the E2E system.',
        id: 8
    }

    it('visits the submit page', () => {
        cy.visit('/submit/');
        cy.contains('h4', 'Submit a post');
    })

    it('makes an anonymous post', () => {
        cy.visit('/submit/');

        cy.contains('h5', 'User: Anonymous');

        // Make an anonymous post
        cy.get('[data-test=submit-title]').clear().type(postAnon.long);
        cy.get('[data-test=submit-body]').clear().type(postAnon.body);
        cy.contains('The title may not be greater than 50 characters.');
        cy.get('[data-test=submit-title]').clear().type(postAnon.perfect);
        cy.get('[data-test=submit-button]').click();
        cy.contains('h3', 'Success!');
        cy.visit('/all/' + postAnon.id);
        cy.contains('[data-test="post-username"]', 'Anonymous');
        cy.contains('[data-test="post-title"]', postAnon.perfect);
    })

    it('makes an auth post', () => {
        cy.login();
        cy.visit('/submit/');

        cy.contains('h5', 'User: Jill Harvard');

        // Make an auth post
        cy.get('[data-test=submit-title]').clear().type(postAuth.long);
        cy.get('[data-test=submit-body]').clear().type(postAuth.body);
        cy.contains('The title may not be greater than 50 characters.');
        cy.get('[data-test=submit-title]').clear().type(postAuth.perfect);
        cy.get('[data-test=submit-button]').click();
        cy.contains('h3', 'Success!');
        cy.visit('/all/' + postAuth.id);
        cy.contains('[data-test="post-username"]', 'Jill Harvard');
        cy.contains('[data-test="post-title"]', postAuth.perfect);
    })
})