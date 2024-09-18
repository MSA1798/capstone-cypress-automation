import { visitHomePageUrl } from '../../../utils/cypress.utils';

describe('cart management test', () => {
  beforeEach(() => {
    visitHomePageUrl();
  });

  it('should add items to cart', () => {
    cy.get('#twotabsearchtextbox').type('smartphones');
    cy.get('#nav-search-submit-button').click();
    cy.wait(3000);
    cy.get('div[data-csa-c-action-name="addToCart"] button.a-button-text').then(($buttons) => {
      const filteredButtons = Array.from($buttons).filter(btn => btn.textContent.includes('Add to cart'));
      cy.log(`Number of "Add to cart" buttons found: ${filteredButtons.length}`);
      if (filteredButtons.length > 3) {
        const buttonsToClick = filteredButtons.slice(0, 3);
        buttonsToClick.forEach(($btn) => {
  cy.wrap($btn).click();
  cy.wait(1000);
        });

        cy.log(`Clicked ${buttonsToClick.length} buttons.`);
      } else {
        cy.log(`Found ${filteredButtons.length} "Add to cart" buttons. Less than 4, so no clicks performed.`);
      }
    });
  });

  it('should add items to cart', () => {
    cy.get('#twotabsearchtextbox').type('smartphones');
    cy.get('#nav-search-submit-button').click();
    cy.wait(3000);
    cy.get('div[data-csa-c-action-name="addToCart"] button.a-button-text').then(($buttons) => {
      const filteredButtons = Array.from($buttons).filter(btn => btn.textContent.includes('Add to cart'));
      cy.log(`Number of "Add to cart" buttons found: ${filteredButtons.length}`);
      if (filteredButtons.length >= 3) {
        const buttonsToClick = filteredButtons.slice(0, 3);
        buttonsToClick.forEach(($btn) => {
          cy.wrap($btn).click();
          cy.wait(2000);
        });

        cy.log(`Clicked ${buttonsToClick.length} buttons.`);
      } else {
        cy.log(`Found ${filteredButtons.length} "Add to cart" buttons. Less than 3, so no clicks performed.`);
      }
    });
    cy.get('#nav-cart').click();
    for (let i = 0; i < 3; i++) {
      cy.log(`no of items in cart ${3}`);
      cy.get('span[data-action="delete"]').then(($deleteButtons, index) => {
        cy.log(`Item no ${index + 1}  removed from cart`);
        cy.wrap($deleteButtons.first())
          .find('input[value="Delete"]')
          .click();
        cy.wait(2000);
      });
    }
    cy.log('all items removed sucess fully');
  });

  it('should verify cart total price ', () => {
    cy.get('#twotabsearchtextbox').type('smartphones');
    cy.get('#nav-search-submit-button').click();
    cy.wait(2000);
    cy.get('div[data-csa-c-action-name="addToCart"] button.a-button-text').then(($buttons) => {
      const filteredButtons = Array.from($buttons).filter(btn => btn.textContent.includes('Add to cart'));
      cy.log(`Number of "Add to cart" buttons found: ${filteredButtons.length}`);
      if (filteredButtons.length >= 3) {
        const buttonsToClick = filteredButtons.slice(0, 3);
        buttonsToClick.forEach(($btn) => {
          cy.wrap($btn).click();
          cy.wait(1000);
        });

        cy.log(`Clicked ${buttonsToClick.length} buttons.`);
      } else {
        cy.log(`Found ${filteredButtons.length} "Add to cart" buttons. Less than 3, so no clicks performed.`);
      }
    });
    cy.get('#nav-cart').click();
    let cartSubtotalPrice = 0;
    let calculatedCartPrice = 0;
    cy.get('span.sc-product-price').each(($priceElement) => {
      cy.wrap($priceElement).invoke('text').then(priceText => {
        const price = parseFloat(priceText.replace(/[^0-9.-]/g, ''));
        if (!isNaN(price)) {
          calculatedCartPrice += price;
        }
      });
    }).then(() => {
      cy.get('div[data-name="Subtotals"]')
        .find('span#sc-subtotal-amount-activecart .sc-price')
        .invoke('text')
        .then(subtotalText => {
          cartSubtotalPrice = parseFloat(subtotalText.replace(/[^0-9.-]/g, ''));
          if (!isNaN(cartSubtotalPrice)) {
            cy.log(`Cart subtotal from page: ${cartSubtotalPrice}`);
          } else {
            cy.log('Error parsing subtotal.');
          }
        }).then(() => {
          cy.log(`Calculated cart price: ${calculatedCartPrice}`);
          cy.log(`Actual cart total displayed: ${cartSubtotalPrice}`);
          expect(calculatedCartPrice).to.equal(cartSubtotalPrice);
        });
    });
  });

  // it('should validate checkout process', () => {
  //   cy.get('#twotabsearchtextbox').type('smartphones');
  //   cy.get('#nav-search-submit-button').click();
  //   cy.wait(3000);
  //   cy.get('div[data-csa-c-action-name="addToCart"] button.a-button-text').then(($buttons) => {
  //     const filteredButtons = Array.from($buttons).filter(btn => btn.textContent.includes('Add to cart'));
  //     cy.log(`Number of "Add to cart" buttons found: ${filteredButtons.length}`);
  //     if (filteredButtons.length >= 3) {
  //       const buttonsToClick = filteredButtons.slice(0, 3);
  //       buttonsToClick.forEach(($btn) => {
  //         cy.wrap($btn).click();
  //         cy.wait(1000);
  //       });

  //       cy.log(`Clicked ${buttonsToClick.length} buttons.`);
  //     } else {
  //       cy.log(`Found ${filteredButtons.length} "Add to cart" buttons. Less than 3, so no clicks performed.`);
  //     }
  //   });
  //   cy.get('#nav-cart').click();
  //   cy.get('[data-feature-id="proceed-to-checkout-action"]').click();
  //   cy.contains('h1', 'Sign in').should('be.visible');
  //   cy.get('input[name="email"]').type('7908680960');
  //   cy.get('input#continue').click();
  //   cy.get('input[name="password"]').type('Sahin@1234');
  //   cy.get('input#signInSubmit').click();
  //   cy.get('input[data-testid="Address_selectShipToThisAddress"]').click();
  //   const textsToCheck = ['card', 'emi', 'upi', 'net banking'];
  //   textsToCheck.forEach(text => {
  //     cy.contains('body', text, { matchCase: false }).should('be.visible');
  //   });
  // });
})