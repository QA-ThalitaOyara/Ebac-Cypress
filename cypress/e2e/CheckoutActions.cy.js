const data = require("../fixtures/loginEbac.json")

describe('Cookie Account', () => {
  beforeEach(() => {
    cy.Login(data.Login.usuario, data.Login.senha)
    cy.Carrinho()
  });

  it('Realizar Checkout', () => {
    cy.visit('/checkout/')
    cy.Checkout(
      data.Checkout.nome, 
      data.Checkout.sobrenome,
      data.Checkout.empresa,
      data.Checkout.pais,
      data.Checkout.endereco,
      data.Checkout.cidade,
      data.Checkout.estado,
      data.Checkout.cep,
      data.Checkout.telefone,
      data.Login.usuario
      )
      cy.get('.woocommerce-notice').should('have.text', 'Obrigado. Seu pedido foi recebido.')
  })

})