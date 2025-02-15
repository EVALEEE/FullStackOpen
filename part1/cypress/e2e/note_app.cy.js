describe('Note app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:5173/')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    it('login form can be opened', function () {
        cy.contains('log in').click()
    })

    it('user can log in', function () {
        cy.contains('log in').click()
        cy.get('#username').type('eva')
        cy.get('#password').type('Lv710115')
        cy.get('#login-button').click()

        cy.contains('eva logged-in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('log in').click()
            cy.get('input:first').type('eva')
            cy.get('input:last').type('Lv710115')
            cy.get('#login-button').click()
        })

        it('a new note can be created', function () {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
    })
})

