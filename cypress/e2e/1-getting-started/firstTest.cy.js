/// <reference types="cypress" />

const { shadeRGBColor } = require("@swimlane/ngx-charts")
const exp = require("constants")
const { wrap } = require("module")

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

    it('then and wrap methods', () => {

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

        // cypress style
        // jquery object
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emaleLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emaleLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

        cy.contains('nb-card', 'Basic form').then( secondForm => {
            const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
            expect(passwordLabelFirst).to.equal(passwordSecondText)

            // convert to cypress
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })

        })
    })

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        // 2  (jquery)
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')

        })

        // 3 (text)
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')  // first method
            .then(classValue => {
                expect(classValue).to.contain('checked')  // second method
            })

    })

    it('assert property', () => {

        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if ( !dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click({force: true})
            let dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    })

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click({force: true})

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first(radioButtons)
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})

            cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')         
        })

    })

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click({force: true})

        // cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})

            // Some notes:
        //.check() works only with types checkboxes and radiobuttons. 
        // only input chechboxes and radiobuttons. Can't uncheck!
        // for uncheck use - .click()
        // Try to use .check() for radiobuttin types elements

    })

    it('lists and dropdowns', () => {
        cy.visit('/')
        // 1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color','rgb(34, 43, 69)')

        // 2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText =  listItem.text().trim()

                const colors ={
                    'Light': 'rgb(255, 255, 255)',
                    'Dark': 'rgb(34, 43, 69)',
                    'Cosmic': 'rgb(50, 50, 89)',
                    'Corporate': 'rgb(255, 255, 255)'
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3){
                    cy.wrap(dropdown).click()
                }

            })
    
        })

    })
    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        // 1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click({force: true})
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click({force: true})
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // 2
        cy.get('thead').find('.nb-plus').click({force: true})
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Dima')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Zadnepryansky')
            cy.wrap(tableRow).find('.nb-checkmark').click({force: true})
        })

        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Dima')
            cy.wrap(tableColumns).eq(3).should('contain', 'Zadnepryansky')
        })

        // 3
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                
            })

        })

        



    })
    it('tooltip', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click() 

        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click({force: true})
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')


    })
    it('dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        // 1
        // cy.get('tbody tr').first().find('.nb-trash').click({force: true})
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.eq('Are you sure you want to delete?')
        // })

        // 2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click({force: true}).then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click({force: true})
        cy.on('window:confirm', (confirm) => false)
    })



})