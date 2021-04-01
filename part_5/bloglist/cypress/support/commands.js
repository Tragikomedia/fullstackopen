const backend = 'http://localhost:3003/api/';

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', backend + 'login', { username, password }).then(
    ({ body }) => {
      localStorage.setItem('blogAppUser', JSON.stringify(body));
      cy.visit('/');
    }
  );
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: backend + 'blogs',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('blogAppUser')).token
      }`,
    },
  });
});
