import { searchAndOpenProductDetails, visitHomePageUrl } from '../../../utils/cypress.utils';
//important : the product will open in another tab , that we can ignore and the initial tab will continue the test , just close the tab which will be newly opened
describe('validate product details', () => {
  beforeEach(() => {
    visitHomePageUrl();
  });

  it('should validate click on search and search results are coming', () => {
      visitHomePageUrl();
      cy.get('#twotabsearchtextbox').type('smartphones');
      cy.get('#nav-search-submit-button').click();
      cy.get('#search').find('[data-component-type="s-search-result"]').should('have.length.greaterThan', 0);
    })

  it('should open product details page and validate the details', () => {
    searchAndOpenProductDetails();
    cy.wait('@getProductDetails').then((interception) => {
      const requestUrl = interception.request.url;
      cy.log('Intercepted request URL:', requestUrl);

      const response = interception.response.body;
      cy.log('Intercepted response:', response);
      cy.visit(`${response.productUrl}`, { failOnStatusCode: false });
      cy.get('#productTitle').should('contain', 'Apple iPhone 13 (128GB) - ');
      cy.get('span.a-size-base.po-break-word')
        .invoke('text')
        .should((text) => {
          expect(text.trim().toLowerCase()).to.contain('apple');
        });
    });
  });

  it('should validate add to cart functionality', () => {
    searchAndOpenProductDetails();
    cy.wait('@getProductDetails').then((interception) => {
          const requestUrl = interception.request.url;
          cy.log('Intercepted request URL:', requestUrl);
    
          const response = interception.response.body;
          cy.log('Intercepted response:', response);
          cy.visit(`${response.productUrl}`, { failOnStatusCode: false });
          cy.get('input.a-button-input[type="submit"]').contains('Add to Cart').click();
          cy.get('.a-alert-heading').contains('Added to Cart');
        });
  });
})