describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = { username: 'Tron', password: 'grid' }
        cy.request('POST', 'http://localhost:3001/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', () => {
        cy.contains("Log in to application")
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get(':nth-child(1) > input').type("Tron")
            cy.get(':nth-child(2) > input').type("grid")
            cy.contains('login').click()
            cy.contains("Blogs")
            cy.contains('logout').click()
        })

        it('fails with wrong credentials', function () {
            cy.get(':nth-child(1) > input').type("bad")
            cy.get(':nth-child(2) > input').type("reallyBad")
            cy.contains('login').click()
            cy.contains("wrong credentials")
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get(':nth-child(1) > input').type("Tron")
            cy.get(':nth-child(2) > input').type("grid")
            cy.contains('login').click()
        })
        it("can create blog, like it and delete it when logged in", function () {
            cy.get(':nth-child(2) > :nth-child(1) > button').click()
            cy.get(':nth-child(1) > input').type("titl")
            cy.get(':nth-child(2) > input').type("auth")
            cy.get(':nth-child(3) > input').type("url")
            cy.get(':nth-child(4) > button').click()
            cy.contains("a new blog titl by auth added")
            cy.contains("titl auth")
            cy.contains("view").click()
            cy.contains("like").click()
            cy.contains("1")
            cy.contains("remove").click()
            cy.contains("titl auth").should("not.exist")
        })

        it("Organizes blogs by most likes", function () {
            cy.contains('create').click()
            cy.get(':nth-child(1) > input').type("titl")
            cy.get(':nth-child(2) > input').type("auth")
            cy.get(':nth-child(3) > input').type("url")
            cy.get(':nth-child(4) > button').click()
            
            cy.visit('http://localhost:3000')
            
            cy.contains('create').click()
            cy.get(':nth-child(1) > input').type("second")
            cy.get(':nth-child(2) > input').type("auth2")
            cy.get(':nth-child(3) > input').type("url2")
            cy.get(':nth-child(4) > button').click()
            
            cy.visit('http://localhost:3000')

            cy.get(':nth-child(1) > :nth-child(4) > button').click()
            cy.contains("like").click()

            cy.visit('http://localhost:3000')

            cy.get('#root > :nth-child(1) > :nth-child(3)').contains("second")
        })

    })

})