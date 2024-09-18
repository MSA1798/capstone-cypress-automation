import { visitHomePageUrl } from '../../../utils/cypress.utils';

describe('checkout process', () => {
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

  it('should validate the checkout process', () => {
    cy.get('a[aria-label="Orders"]').click();
    cy.wait(2000);
    cy.get('input#email').type('testuser@email.com');
    cy.wait(2000);
    cy.get('input#password').type('testuser1');
    cy.wait(2000);
    cy.contains('button', 'log in', {matchCase : false}).click();
    cy.wait(2000);
    cy.get('button[aria-label="Cart"]').click();
    cy.contains('button', 'checkout', {matchCase : false}).click();
    cy.wait(2000)
    cy.contains('button', 'checkout', {matchCase : false}).click();
    cy.wait(2000);
    cy.contains('h1', 'thank you!', {matchCase : false}).should('be.visible');
    cy.contains('p', 'We are now processing your order. If you have any concerns feel free to email us at customerservice@example.com', {matchCase : false}).should('be.visible');
  });
});