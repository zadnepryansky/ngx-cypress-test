/// <reference types="cypress" />

const exp = require("constants")

describe('Our first suite', () => {

    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name ant Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different Attributes
        cy.get('[placeholder="Email"][fullwidth][type="email"]')

        //by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recomended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('secont test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            // .click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

    it.only('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')


        // selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // cypress
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emaleLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emaleLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')
        })





    })


})
