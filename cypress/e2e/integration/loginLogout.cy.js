import { visitHomePageUrl } from '../../../utils/cypress.utils';
import { generateLongRandomNumber } from '../../../utils/generateRandomNumber.utils'

describe('validate login logout', () => {
  let userId = '';
  let password = '';
  beforeEach(() => {
    visitHomePageUrl('https://ecommercepractice.letskodeit.com');
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Minified React error #425') ||
          err.message.includes('Minified React error #418') ||
          err.message.includes('Minified React error #423')) {
        return false;
      }
      return true;
    });
  });
  it('should register user', () => {
    let randomNumber = generateLongRandomNumber(10);
    cy.get('a[aria-label="Orders"]').click();
    cy.wait(2000);
    cy.contains('button', 'create an account').click();
    cy.wait(2000);
    cy.get('input#firstName').type('test');
    cy.get('input#lastName').type(`user${randomNumber}`);
    userId = `testUser${randomNumber}@email.com`;
    password = `testUser${randomNumber}@email`;
    cy.get('input#email').type(`testUser${randomNumber}@email.com`);
    cy.get('input#password').type(`testUser${randomNumber}@email`);
    cy.contains('button', 'create account').click();
    cy.wait(2000);
    cy.contains('body', 'account created', { matchCase: false }).should('be.visible');
  })

  it('should login user', () => {
    cy.get('a[aria-label="Orders"]').click();
    cy.wait(2000);
    cy.get('input#email').type(userId);
    cy.get('input#password').type(password);
    cy.contains('button', 'log in', {matchCase : false}).click();
  })

  it('should log out the user', () => {
    cy.get('a[aria-label="Orders"]').click();
    cy.wait(2000);
    cy.get('input#email').type(userId);
    cy.get('input#password').type(password);
    cy.contains('button', 'log in', {matchCase : false}).click();
    cy.get('a[aria-label="Orders"]').click();
  });
})