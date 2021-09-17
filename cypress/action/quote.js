/// <reference types="cypress" />

require('@4tw/cypress-drag-drop')

class Quote {
    elements() {
        var elementsList = {
            professionalField: "[data-testid=text-input]",
            searchResultBox: ".highlighted > .flex",
            nextButton: "[data-testid=next-button]",
            professionalFieldErrorMessage: ".frame-me",
            errorIndicatorBox: "[data-comp='error-wrapper']",
            indutriesDataBox: "[data-qa-hook='industries-data']",
            acceptGrossRevenueValueButton: "[for='revenueLastFinancialYearFromCanadayes']",
            declineGrossRevenueValueButton: "[for='revenueLastFinancialYearFromCanadano']",
            acceptCurrentRevenueValueButton: "[for='projectedRevenueCurrentFinancialYearFromCanadayes']",
            revenueValueSlider: ".rc-slider-handle",
            emailField: "[data-testid=text-input]",
            otherCountryField: "[data-testid=text-input]",
            percentageErrorBox: ".text-xs",
            valueTitle: ".H2",
        }

        return elementsList
    }

   
    accessLoginPage() {
        cy.visit(Cypress.env('quotePage'))
    }

    searchProfessional(searchVariable) {
        cy.get(this.elements().professionalField).type(searchVariable)
    }

    searchLengthResponse() {
        cy.get(this.elements().indutriesDataBox).children().should(($array) => {
            expect($array.length).to.be.greaterThan(1)
        })
    }

    searchDataResponse(firstDataResult) {
        cy.get(this.elements().indutriesDataBox).children().should(($array) => {
            expect($array[0].innerText).to.be.eq(firstDataResult)
        })
    }

    selectResult(insdustry) {
        cy.get('body').contains(insdustry).click()
    }


    confirmNoSearchResult(professionalErrorMessage, errorIndicatorMessage) {
        cy.get(this.elements().indutriesDataBox).children().should('have.length', 0)
        cy.get(this.elements().nextButton).click()
        cy.get(this.elements().professionalFieldErrorMessage)
        cy.get(this.elements().errorIndicatorBox)
        cy.get('body').contains(professionalErrorMessage)
        cy.get('body').contains(errorIndicatorMessage)
    }

    selectGroosRevenue(accept, value) {
        cy.get('body').contains(value).click()
        cy.get(this.elements().valueTitle).should(($element) => {
            expect($element.text()).to.be.eq(value + ' ')
        })
        
        if (accept) {
            cy.get(this.elements().acceptGrossRevenueValueButton).click()
            cy.get(this.elements().nextButton).click()
        } else {
            cy.get(this.elements().declineGrossRevenueValueButton).click()
        }
        

    }

    selectRevenueOnCountries(otherCountry) {
        cy.get(this.elements().revenueValueSlider).eq(1).move({ deltaX: 220, deltaY: 100 })
        cy.get(this.elements().revenueValueSlider).eq(2).move({ deltaX: 220, deltaY: 200 })
        cy.get(this.elements().revenueValueSlider).eq(3).move({ deltaX: 220, deltaY: 300 })
        cy.get(this.elements().revenueValueSlider).eq(4).move({ deltaX: 300, deltaY: 400 })
        cy.get(this.elements().otherCountryField).type(otherCountry)
        cy.get(this.elements().nextButton).click()

    }

    confirmPercentageTotalIncorrect(percentageErrorMessage, errorIndicatorMessage) {
        cy.get(this.elements().professionalFieldErrorMessage)
        cy.get(this.elements().percentageErrorBox)
        cy.get(this.elements().errorIndicatorBox)
        cy.get('body').contains(percentageErrorMessage)
        cy.get('body').contains(errorIndicatorMessage)
    }

    selectProjectRevenue() {
        cy.get(this.elements().revenueValueSlider).move({ deltaX: 200, deltaY: 100 })
        cy.get(this.elements().acceptCurrentRevenueValueButton).click()
        cy.get(this.elements().nextButton).click()
    }

    insertEmail(email) {
        cy.get(this.elements().emailField).type(email)
        cy.get(this.elements().nextButton).click()
    }

    confirmEmailWasIncorrect(invalidEmailMessage, errorIndicatorMessage) {
        cy.get(this.elements().professionalFieldErrorMessage)
        cy.get(this.elements().errorIndicatorBox)
        cy.get('body').contains(invalidEmailMessage)
        cy.get('body').contains(errorIndicatorMessage)
    }


}

export default Quote