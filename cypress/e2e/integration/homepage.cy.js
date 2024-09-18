describe('Home page nvaigation', () => {
  it('successfully loads', () => {
    cy.visit('https://amazon.in');
  })
})

describe('Check the product catagories', () => {
  it('successfully validated the catagories', () => {
    cy.visit('https://amazon.in')
    cy.get('[href="/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles"]').should('exist');
    cy.get('[href="/electronics/b/?ie=UTF8&node=976419031&ref_=nav_cs_electronics"]').should('exist');
  })
})
