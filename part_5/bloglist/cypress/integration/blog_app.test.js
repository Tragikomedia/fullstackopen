const backend = 'http://localhost:3003/api/';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', backend + 'testing/reset');
    cy.visit('/');
  });

  it('Login form is shown', function () {
    cy.get('h2').contains('Please log in to use the app');
    cy.get('input[name=Username]').should('be.visible');
    cy.get('input[name=Password]').should('be.visible');
    cy.get('button[type=submit]').should('be.visible');
  });
  describe('Login', function () {
    let user;
    beforeEach(function () {
      user = {
        username: 'testuser',
        name: 'Test von Testenland',
        password: 'admin1',
      };
      cy.request('POST', backend + 'users', user);
    });

    it('Given correct credentials, should be able to log in', function () {
      cy.get('input[name=Username]').type(user.username);
      cy.get('input[name=Password]').type(`${user.password}{enter}`);
      cy.get('h3').contains(`Hello ${user.name}`);
      cy.get('h2').contains('Blogs');
    });

    it('Given incorrect credentials, should not be able to log in', function () {
      cy.get('input[name=Username]').type('Wrong');
      cy.get('input[name=Password]').type('totallywrong{enter}');
      cy.get('h3').should('not.exist');
      cy.get('h2').should('not.contain', 'Blogs');
    });
  });
});
