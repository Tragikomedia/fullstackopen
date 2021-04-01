const resetAddress = 'http://localhost:3003/api/testing/reset';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', resetAddress);
    cy.visit('/');
  });

  it('Login form is shown', function() {
    cy.get('h2').contains('Please log in to use the app');
    cy.get('input[name=Username]').should('be.visible');
    cy.get('input[name=Password]').should('be.visible');
    cy.get('button[type=submit]').should('be.visible');
  });
});
