/// <reference types ="cypress" /> 

Cypress.Commands.add('Login', (user, pass) => {
    const fd = new FormData()
    fd.append('log', user)
    fd.append('pwd', pass)
    fd.append('wp-submit', "Acessar")
    fd.append('redirect_to', '/minha-conta/')
    fd.append('testcookie', 1)

    cy.request({
        url: '/wp-login.php',
        method: 'POST',
        body: fd
    }).then(resp => {
        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const divisor = firstPart.indexOf('=')
            const key = firstPart.substring(0, divisor)
            const value = firstPart.substring(divisor + 1)
            cy.setCookie(key, value)
        })
    })
    cy.visit('/minha-conta/')
    cy.contains('Welcome teste1-man !')
})

Cypress.Commands.add('Carrinho', () => {

    cy.get('#cart > a > span.mini-cart-items').invoke('text').then(($el) => {
    if($el == 0){


        cy.get('#primary-menu > .menu-item-629 > a').click();
        cy.get('[class="products products-grid"]')
            .find('[class="product-block grid"]')
            .first()
            .click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear()
            .type('2')
        cy.get('.single_add_to_cart_button').click()

    } else {
        cy.get('.dropdown-toggle > .mini-cart-items').click()
        cy.get('.button.checkout.wc-forward').last().click()
    }
})
    cy.contains('Checkout')
})

Cypress.Commands.add('Checkout', (nome, sobrenome, empresa, pais, endereco, cidade, estado, cep, telefone, email) => {

    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type(empresa)
    cy.get('#select2-billing_country-container').click().type(pais).get('[title="Brasil"]').click()
    cy.get('#billing_address_1').clear().type(endereco)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#billing_email').clear().clear().type(email)
    cy.get('#terms').click()
    cy.get('#place_order').click()
})