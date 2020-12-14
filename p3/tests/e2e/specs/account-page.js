describe('Account Page', () => {

    let user = {
        name: 'Jill Harvard',
        email: 'jill@harvard.edu',
        password: 'asdfasdf'
    }

    sub = {
        right: 'Jamal Harvard',
        wrong: 'Test',
        anon: 'Anonymous'
    }

    it('shows an error if login is invalid', () => {
        cy.visit('/account');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type('this-password-should-not-work');
        cy.get('[data-test=login-button]').click();
        cy.contains('These credentials do not match our records');
    })

    it('lets a user log in and log out', () => {
        cy.login();
        cy.contains('[data-test="welcome-message"]', user.name);

        cy.get('[data-test=logout-button]').click();

        // We know logout works if we see the login button again
        cy.get('[data-test="login-button"]').should('exist');
    })

    it('adds a subscription', () => {
        cy.login();
        cy.contains('[data-test="welcome-message"]', user.name);

        // confirm current subscription count to be 1
        cy.wait(1000);
        cy.get('[data-test="sub"]').its('length').should('be.gte', 1);

        // add a subscription
        cy.get('[data-test=add-sub-input]').clear().type(sub.wrong);
        cy.get('[data-test=add-sub-button]').click();
        cy.contains('There are no posts made by this user.');
        cy.get('[data-test=add-sub-input]').clear().type(sub.anon);
        cy.get('[data-test=add-sub-button]').click();
        cy.contains('You cannot subscribe to the default Anonymous user or yourself.');
        cy.get('[data-test=add-sub-input]').clear().type(sub.right);
        cy.get('[data-test=add-sub-button]').click();
        cy.contains('h3', 'Success!');

        // confirm current subscription count to be 2
        cy.wait(1000);
        cy.get('[data-test="sub"]').its('length').should('be.gte', 2);
    })

    it('removes a subscription', () => {
        cy.login();
        cy.contains('[data-test="welcome-message"]', user.name);

        // confirm current subscription count to be 2
        cy.wait(1000);
        cy.get('[data-test="sub"]').its('length').should('be.gte', 2);

        // remove a subscription
        cy.get('[data-test=del-sub-input]').clear().type(sub.wrong);
        cy.get('[data-test=del-sub-button]').click();
        cy.contains('You are not subscribed to this person.');
        cy.get('[data-test=del-sub-input]').clear().type(sub.right);
        cy.get('[data-test=del-sub-button]').click();
        cy.contains('h3', 'Success!');

        // confirm current subscription count to be 1
        cy.wait(1000);
        cy.get('[data-test="sub"]').its('length').should('be.gte', 1);
    })
})