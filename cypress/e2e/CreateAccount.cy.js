/// <reference types="cypress" />

const RegisterAccount = require('../support/pages/createAccount.page')

import {faker} from '@faker-js/faker';

describe('Create Account', () => {
  beforeEach(() => {
    cy.visit('/minha-conta/')
  });
  it('Register Accept', () => {
    const email = faker.internet.email();
    const senha = faker.random.alphaNumeric(10);
    const user = email.split('@')[0].toLocaleLowerCase();

    RegisterAccount.register(email, senha)
    cy.get('a > .hidden-xs').should('contain', 'Welcome ' + user + ' !')

  })
})