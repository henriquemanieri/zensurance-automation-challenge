/// <reference types="cypress" />

import Quote from '../../action/quote'

const quote = new Quote()

describe('quote', function () {
    beforeEach(() => {
        this.fixtures = Cypress.env('fixtures')
        quote.accessLoginPage()
    })


    it('Quote Exercise 1', () => {
        quote.searchProfessional(this.fixtures.searchKeyWords.invalidSearch)
        quote.confirmNoSearchResult(this.fixtures.errorMessages.professionalFieldErrorMessage, this.fixtures.errorMessages.defaultErrorIndicator)
    })

    it('Quote Exercise 2', () => {
        quote.searchProfessional(this.fixtures.searchKeyWords.validSearch)
        quote.searchLengthResponse()
        quote.searchDataResponse(this.fixtures.data.dataResponseComparison)
        quote.selectResult(this.fixtures.data.industryNameData) 
        quote.selectGroosRevenue(true, this.fixtures.values.revenueValue)
        quote.selectProjectRevenue()
        quote.insertEmail(this.fixtures.email.invalidEmail)
        quote.confirmEmailWasIncorrect(this.fixtures.errorMessages.invalidEmailErrorMessage, this.fixtures.errorMessages.defaultErrorIndicator)
    })

    it('Quote Exercise 3', () => {
        quote.searchProfessional(this.fixtures.searchKeyWords.validSearch)
        quote.searchLengthResponse()
        quote.searchDataResponse(this.fixtures.data.dataResponseComparison)
        quote.selectResult(this.fixtures.data.industryNameData) 
        quote.selectGroosRevenue(false, this.fixtures.values.revenueValue)
        quote.selectRevenueOnCountries(this.fixtures.data.country)
        quote.confirmPercentageTotalIncorrect(this.fixtures.errorMessages.percentageErrorBox, this.fixtures.errorMessages.defaultErrorIndicator)
    })
})