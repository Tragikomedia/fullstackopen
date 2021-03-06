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

    describe('Blogs', function () {
      let blog1, blog2, blog3;
      beforeEach(function () {
        cy.login(user);
        blog1 = {
          title: 'title1',
          author: 'author1',
          url: 'url1.com',
        };
        blog2 = {
          title: 'title2',
          author: 'author2',
          url: 'url2.com',
        };
        blog3 = {
          title: 'title3',
          author: 'author3',
          url: 'url3.com',
        };
        cy.createBlog(blog1);
        cy.createBlog(blog2);
        cy.createBlog(blog3);
        cy.visit('/');
      });

      it('Given logging in, should be able to see all three initial blogs', function () {
        cy.contains(blog1.title);
        cy.contains(blog2.author);
        cy.contains(`${blog3.title} ${blog3.author}`);
      });

      it('Given clicking Add blog button, should be able to send the note and not see the form', function () {
        const newBlog = {
          title: 'new blog',
          author: 'new author',
          url: 'newurl.com',
        };
        cy.contains('Add blog').click();
        cy.contains('cancel');
        cy.get('input[name=Title]').type(newBlog.title);
        cy.get('input[name=Author]').type(newBlog.author);
        cy.get('input[name=Url]').type(`${newBlog.url}{enter}`);
        cy.contains('Add blog');
        cy.contains(`${newBlog.title} ${newBlog.author}`);
      });

      it('Given liking a blog, its like count should increment', function () {
        cy.contains(blog1.title).parent().as('blog');
        cy.get('@blog').find('button').click();
        cy.get('@blog').contains('likes 0');
        cy.get('@blog').find('[data-cy=likeBtn]').click();
        cy.get('@blog').contains('likes 1');
      });

      it('Given a user created a blog, they should be able to delete it', function () {
        cy.contains(`${blog1.title} ${blog1.author}`).parent().as('blog');
        cy.get('@blog').find('button').click();
        cy.get('@blog').find('[data-cy=deleteBtn]').click();
        cy.contains(`Successfully deleted ${blog1.title}`);
        cy.contains(`${blog1.title} ${blog1.author}`).should('not.exist');
      });

      it('Given a user did not create a blog, they should not be able to delete it', function () {
        const newUser = {
          username: 'new user',
          name: 'New Userre',
          password: '123hey',
        };
        cy.request('POST', backend + 'users', newUser);
        cy.login(newUser);
        cy.contains(`${blog1.title} ${blog1.author}`).parent().as('blog');
        cy.get('@blog').find('button').click();
        cy.get('@blog').find('[data-cy=deleteBtn]').click();
        cy.contains('Could not delete blog');
        cy.contains(`${blog1.title} ${blog1.author}`);
      });

      it('Given a user gave out a few likes, the blogs should be ordered from the most to the least liked', function () {
        cy.get('.blog > ul')
          .find('[data-cy=expandBtn]')
          .then((buttons) => {
            buttons.map((index, button) => cy.get(button).click());
          });
        cy.contains(`${blog3.title} ${blog3.author}`)
          .parent()
          .find('[data-cy=likeBtn]')
          .click();
        cy.contains(`${blog2.title} ${blog2.author}`)
          .parent()
          .find('[data-cy=likeBtn]')
          .click();
        cy.contains(`${blog3.title} ${blog3.author}`)
          .parent()
          .find('[data-cy=likeBtn]')
          .click();
        const numRegExp = /\d+/;
        cy.get('[data-cy=likeLi]').then((likeLis) => {
          const [likes1, likes2, likes3] = likeLis.map((index, li) =>
            parseInt(numRegExp.exec(li.textContent)[0])
          );
          expect(likes1).to.equal(2);
          expect(likes2).to.equal(1);
          expect(likes3).to.equal(0);
        });
      });
    });
  });
});
