/// <reference types="cypress" />

import { homePage } from '../support/pages/home.page'
import { productSearchPage } from '../support/pages/productSearchPage.page'
const data = require("../fixtures/data.json")

describe('Product Search', () => {
    before(() => {
        cy.intercept({
            method: 'GET',
            url: '/wp-admin/admin-ajax.php', // asterisco significa que não importa o que ele vai receber de resto na URL
            query: { // serve para interceptar requisições que tem uma determinada busca. Ou seja os parametros que vou passar
                term: 'Jacket'
            }
        },
            req => {
                req.reply({
                    statusCode: 200,
                    body: `${req.query.callback}(
                ${JSON.stringify(
                        data.autoComplete()
                    )}
            )`

                })
            })
    });
    beforeEach(() => {
        cy.visit('/')
    });
    it('autocomplete in a search', () => {
        homePage.searchMagnifier()
        productSearchPage.search('Jacket')
        productSearchPage.productList.first().should('have.attr', 'title', 'Ingrid Running Jacket')
    });
});