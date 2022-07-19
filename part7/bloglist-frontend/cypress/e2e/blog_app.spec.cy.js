/* eslint-disable */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkaii')
      cy.get('#password').type('salainenn')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
    })
  })
  // Error notification not implemented => can not Check that the notification shown with unsuccessful login is displayed red
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and some blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog A created by cypress',
          author: 'test author 1',
          url: 'test url 1',
        })
        cy.createBlog({
          title: 'a blog B created by cypress',
          author: 'test author 2',
          url: 'test url 2',
        })
        cy.createBlog({
          title: 'a blog C created by cypress',
          author: 'test author 3',
          url: 'test url 3',
        })
      })
      it('users can like a blog', function () {
        cy.contains('a blog C created by cypress').contains('view').click()
        cy.get('.likeElement').eq(2).find('button').click()
        cy.contains('a blog C created by cypress').contains('likes 1')
      })
      it('user who created a blog can delete it', function () {
        cy.contains('a blog A created by cypress')
          .parent()
          .contains('view')
          .click()
        cy.contains('a blog A created by cypress')
          .parent()
          .get('#remove-button')
          .click()
        cy.get('html').should('not.contain', 'a blog A created by cypress')
      })
      it('Bonus test:other users cannot delete the blog', function () {
        const user2 = {
          name: 'Luukkainen Matti',
          username: 'mluukkai2',
          password: 'salainen2',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')
        cy.contains('log out').click()
        cy.contains('login').click()
        cy.get('#username').type('mluukkai2')
        cy.get('#password').type('salainen2')
        cy.get('#login-button').click()

        cy.contains('a blog A created by cypress')
          .parent()
          .contains('view')
          .click()
        cy.contains('a blog A created by cypress')
          .parent()
          .get('#remove-button')
          .click()
        cy.get('html').should('contain', 'a blog A created by cypress')
      })
      it('blog with the most likes being first', function () {
        // Default after beforeEach(): A - B -C (000)
        cy.contains('a blog C created by cypress').contains('view').click()
        cy.get('.likeElement').eq(2).find('button').click()
        // After press like in C: C- A - B (100)

        cy.contains('a blog B created by cypress').contains('view').click()
        cy.get('.likeElement').eq(2).find('button').click()
        // After press like in B: B-C-A (110)

        cy.contains('a blog C created by cypress').contains('view').click()
        cy.get('.likeElement').eq(1).find('button').click()
        // After press like in C again: C-B-A (210)

        cy.contains('a blog A created by cypress').contains('view').click()
        cy.contains('a blog B created by cypress').contains('view').click()
        cy.contains('a blog C created by cypress').contains('view').click()

        // Should have correct order: C-B-A (210)
        cy.get('.blogElement').eq(0).contains('likes 2')
        cy.get('.blogElement').eq(1).contains('likes 1')
        cy.get('.blogElement').eq(2).contains('likes 0')
      })
    })
  })
})
